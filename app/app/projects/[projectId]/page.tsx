"use client";

import { Button } from "@/components/ui/button";
import { MonitorIcon, PlusIcon } from "lucide-react";
import GearIcon from "next/dist/client/components/react-dev-overlay/ui/icons/gear-icon";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQueryState } from "nuqs";
import React from "react";
import { cn } from "@/lib/utils";
import Loader from "@/components/loader/loader";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateCollectionModal from "@/components/modals/create-collection/create-collection-modal";
import CreateDocumentModal from "@/components/modals/create-document/create-document-modal";

export default function Page() {
  const { projectId } = useParams();
  const { user } = useUser();
  const { organization } = useOrganization();
  const orgId = organization ? organization.id : user?.id;
  const { data, isLoading: loadingDatabase, mutate } = useSWR(`/api/v1/databases/${projectId}`, fetcher);

  const [isOpenCollectionModal, setIsOpenCollectionModal] = React.useState(false);
  const [isOpenDocumentModal, setIsOpenDocumentModal] = React.useState(false);

  const router = useRouter();

  const [collectionId, setCollectionId] = useQueryState("~C1");
  const [documentId, setDocumentId] = useQueryState("~D1");

  if (loadingDatabase) return <Loader/>;

  return (
    <div>
      <div className={"flex justify-between items-center p-4 gap-4"}>
        <h2 className={"text-5xl font-bold text-neutral-950 mb-5 relative"}>Data <span className={"text-sm font-mono text-green-500 uppercase bg-green-200 p-1"}>realtime</span>
        </h2>
        <div className={"flex gap-2"}>
          <Button disabled><MonitorIcon/>Monitor</Button>
          <Button onClick={() => router.push(`/app/projects/${projectId}/manage`)}><GearIcon/>Settings</Button>
        </div>
      </div>
      <div className={"w-full h-[600px] grid grid-cols-[1fr_1fr_2fr] bg-neutral-50 text-neutral-500"}>
        <div className={"flex flex-col overflow-y-auto overflow-x-hidden border border-neutral-900 relative"}>
          <div className={"text-center p-3 sticky inset-0 bg-black text-white h-12 font-semibold"}>Collections</div>
          <Dialog open={isOpenCollectionModal} onOpenChange={setIsOpenCollectionModal}>
            <DialogTrigger>
              <div className={"p-2 text-blue-600 font-semibold hover:cursor-pointer flex gap-1 items-center hover:bg-blue-50"}>
                <PlusIcon size={12}/>Start collection
              </div>
            </DialogTrigger>
            <CreateCollectionModal mutate={mutate} handleClose={() => setIsOpenCollectionModal(false)}/>
          </Dialog>

          {data && Object.keys(data).map((label, i) => (
            <ListItem
              active={collectionId === label} label={label} key={i} onClick={async () => {
              await setCollectionId(label);
              await setDocumentId(null);
            }}
            />
          ))}
        </div>
        <div className={"flex flex-col overflow-y-auto border-b border-t border-neutral-900"}>
          <div className={"text-center p-3 sticky inset-0  bg-black text-white h-12 font-semibold"}>{data && collectionId ? collectionId : "Documents"}</div>
          <Dialog open={isOpenDocumentModal} onOpenChange={setIsOpenDocumentModal}>
            <DialogTrigger>
              <div className={"p-2 text-blue-600 font-semibold hover:cursor-pointer flex gap-1 items-center hover:bg-blue-50"}>
                <PlusIcon size={12}/>Start document
              </div>
            </DialogTrigger>
            <CreateDocumentModal mutate={mutate} handleClose={() => setIsOpenDocumentModal(false)}/>
          </Dialog>
          {data && collectionId && data[collectionId].map((item: any) => (
            <ListItem
              active={documentId === item.id}
              label={item.id}
              key={item.id}
              onClick={() => setDocumentId(item.id)}
            />
          ))}
        </div>
        <div className={"border border-neutral-900"}>
          <div className={"text-center p-3 sticky inset-0 bg-black text-white h-12 font-semibold"}>{data && collectionId && documentId ? documentId : null}</div>
          <pre className={"break-words whitespace-pre-wrap overflow-x-auto text-sm p-2"}>
    {data && collectionId && documentId
      ? JSON.stringify(data[collectionId].find((item: any) => item.id === documentId), null, 2)
      : ""}
  </pre>
        </div>
      </div>

      <div className="text-center text-sm text-neutral-500 mt-4">
        The database visualizer is currently under development. Stay tuned for updates!
      </div>
    </div>
  );
}

interface ListItemProps extends React.HTMLProps<HTMLDivElement> {
  label: string;
  active: boolean;
  className?: string;
}

const ListItem = ({ label, active, className, ...rest }: ListItemProps) => {
  return <div {...rest} className={cn("p-2 hover:bg-neutral-200 hover:text-neutral-950 hover:cursor-pointer w-full sm:w-auto whitespace-nowrap", className, active && "bg-neutral-200 text-neutral-900")}>{label}</div>;
};
