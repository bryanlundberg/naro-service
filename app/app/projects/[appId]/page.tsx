"use client";

import { Button } from "@/components/ui/button";
import { MonitorIcon } from "lucide-react";
import GearIcon from "next/dist/client/components/react-dev-overlay/ui/icons/gear-icon";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const listItem = (label: string) => {
    return <div className={"p-2 hover:bg-neutral-200 hover:text-neutral-950 hover:cursor-pointer w-full sm:w-auto whitespace-nowrap "}>{label}</div>;
  };

  return (
    <div>
      <div className={"flex justify-between items-center p-4 gap-4"}>
        <h2 className={"text-5xl font-bold text-neutral-950 mb-5"}>Data</h2>
        <div className={"flex gap-2"}>
          <Button disabled><MonitorIcon/>Monitor</Button>
          <Button onClick={() => router.push("/app/projects/<id>/manage")}><GearIcon/>Settings</Button>
        </div>
      </div>
      <div className={"border w-full h-96 grid grid-cols-[1fr_1fr_2fr] bg-neutral-50 text-neutral-500"}>
        <div className={"flex flex-col overflow-y-auto overflow-x-hidden border relative"}>
          <div className={"text-center p-3 border-b sticky inset-0 bg-black text-white"}>Collections</div>
          {[12, , 33, 3, 5, 5, 5, 5, 5, 5, 5, 5, 3, 3].map((_, i) => (
            listItem("collection")
          ))}
        </div>
        <div className={"flex flex-col overflow-y-auto border"}>
          <div className={"text-center p-3 border-b sticky inset-0 bg-black text-white"}>Documents</div>

          {[13, 3, 3].map((_, i) => (
            listItem("document")
          ))}
        </div>
        <div className={"border"}>
          <div className={"text-center p-3 border-b sticky inset-0 bg-black text-white"}>Document</div>
          <pre className={"break-words whitespace-pre-wrap overflow-x-auto text-sm"}>
    {JSON.stringify(
      {
        "id": "1",
        "name": "test",
        "description": "test",
        "createdAt": Date.now(),
        "updatedAt": Date.now()
      },
      null,
      2
    )}
  </pre>
        </div>
      </div>
    </div>
  );
}
