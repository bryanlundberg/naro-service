"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyIcon, DatabaseIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Loader from "@/components/loader/loader";
import moment from "moment";
import Deploying from "@/components/deploying/deploying";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const { organization } = useOrganization();
  const { projectId } = useParams();

  const orgId = organization ? organization.id : user?.id;
  const { data: instance, isLoading } = useSWR(
    orgId && projectId ? `/api/v1/projects/${orgId}/${projectId}` : null,
    fetcher
  );

  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeleteInstance = async () => {
    const response = await fetch(`/api/v1/projects/${orgId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: instance.id,
      }),
    });

    if (response.ok) {
      router.push("/app/projects");
    } else {
      console.error("Failed to delete the instance");
    }
  }

  const handleCopyUri = () => {
    navigator.clipboard.writeText(naroUri);
    toast("Naro URI copied to clipboard");
  }

  useEffect(() => {
    if (instance?.finishBuild) {
      setIsDeploying(Date.now() < instance.finishBuild);
      const interval = setInterval(() => {
        if (Date.now() >= instance.finishBuild) {
          setIsDeploying(false);
          clearInterval(interval);
        }
        console.log("Checking if deploying is finished...");
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [instance?.finishBuild]);

  if (isLoading) return <Loader/>;
  if (!instance)
    return (
      <div className={"text-center text-lg font-semibold"}>
        No instance found
      </div>
    );

  const naroUri = `${window.location.origin}/api/v1/databases;${orgId};${instance.id}`;

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between items-center p-4 gap-4"}>
        <div>
          <h1 className={"font-black text-5xl"}>{instance.projectName || "Untitled Project"}</h1>
          <div>
            <div className={"font-mono text-sm mt-3"}>
              Application ID: {instance.applicationId || "N/A"}
            </div>
            <div className={"font-mono text-sm"}>
              Created at:{" "}
              {instance.createdAt
                ? moment(instance.createdAt).format("MM-DD-YYYY")
                : "N/A"}
            </div>
          </div>
        </div>
        {instance.finishBuild && Date.now() > instance.finishBuild && (
          <div className={"flex gap-2"}>
            <Button variant={"destructive"} onClick={handleDeleteInstance}>
              Destroy
            </Button>
            <Button
              onClick={() => router.push(`/app/projects/${projectId}`)}
            >
              <DatabaseIcon/>
              View data
            </Button>
          </div>
        )}
      </div>

      <div className={"w-full border-b "}></div>

      {isDeploying && <Deploying/>}

      {!isDeploying && (
        <>
          <div className={"text-lg font-semibold"}>Naro URI</div>
          <div className={"flex gap-2 items-center"}>
            <Input
              className={"w-full max-w-[650px]"}
              value={naroUri}
              readOnly
            />
            <Button size={"icon"} variant={"outline"} onClick={handleCopyUri}>
              <CopyIcon/>
            </Button>
          </div>

          <div className={"text-lg font-semibold mt-5"}>How to connect?</div>

          <div>Create a .env file in the root of your project</div>
          <div className={"bg-gray-100 p-4 rounded text-sm dark:bg-neutral-800"}>
            <pre>
              <code>{`NARODB_URI=${naroUri}`}</code>
            </pre>
          </div>

          <div>Then in your code</div>
          <div className={"bg-gray-100 p-4 rounded text-sm dark:bg-neutral-800"}>
            <pre>
              <code>{`import { Naro } from "@narodb/naro";
const URI = process.env.NARODB_URI;
const db = new Naro("connect", { URI });`}</code>
            </pre>
          </div>
          <div>Now you can use the db object to interact with your NaroDB instance</div>
          <div className={"bg-gray-100 p-4 rounded text-sm dark:bg-neutral-800"}>
            <pre>
              <code>{`const users = await db.add("users", {
  name: "John Doe",
});`}</code>
            </pre>
          </div>
        </>
      )}
    </div>
  );
}
