"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatabaseIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  const { organization } = useOrganization();


  // const { data, isLoading, mutate } = useSWR(`/api/v1/projects/${organization ? organization?.id : user?.id}`, fetcher);

  return (
    <div className={"flex flex-col gap-2"}>
      <div className={"flex justify-between items-center p-4 gap-4"}>
        <div>
          <h1 className={"font-black text-5xl"}>my-incredible-app</h1>
          <div>
            <div className={"font-mono text-sm mt-3"}>Application ID: 99432113432</div>
            <div className={"font-mono text-sm"}>Created at: 2023-10-01</div>
          </div>
        </div>
        <div className={"flex gap-2"}>
          <Button variant={"destructive"} disabled>Destroy</Button>
          <Button onClick={() => router.push("/app/projects/<id>")}><DatabaseIcon/>View data</Button>
        </div>
      </div>

      <div className={"w-full border-b "}></div>

      <div className={"text-lg font-semibold"}>Naro URI</div>
      <Input
        className={"w-full max-w-[550px]"}
        value="narodb://user_2wv5d07JPRUflViF2uKBhjgzSYf:naroapi.com:4010/99432113432"
        readOnly
      />

      <div className={"text-lg font-semibold mt-5"}>How to connect?</div>

      <div>Create a .env file in the root of your project</div>
      <div className={"bg-gray-100 p-4 rounded text-sm"}>
        <pre>
    <code>{`NARODB_URI=narodb://user_2wv5d07JPRUflViF2uKBhjgzSYf:naroapi.com:4010/99432113432`}</code>
  </pre>
      </div>

      <div>Then in your code</div>
      <div className={"bg-gray-100 p-4 rounded text-sm"}>
          <pre>
      <code>{`import { Naro } from "@narodb/naro";
const URI = process.env.NARODB_URI;
const db = new Naro("connect", { URI });`}</code>
    </pre>
      </div>
      <div>Now you can use the db object to interact with your NaroDB instance</div>
      <div className={"bg-gray-100 p-4 rounded text-sm"}>
        <pre>
    <code>{`const users = db.add("users", {
  name: "John Doe",
});`}</code>
  </pre>
      </div>
    </div>
  );
}
