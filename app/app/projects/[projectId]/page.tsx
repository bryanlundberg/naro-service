"use client";

import { Button } from "@/components/ui/button";
import { EditIcon, MinusCircleIcon, MonitorIcon, PlusCircleIcon } from "lucide-react";
import GearIcon from "next/dist/client/components/react-dev-overlay/ui/icons/gear-icon";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useQueryState } from "nuqs";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateCollectionModal from "@/components/modals/create-collection/create-collection-modal";
import CreateDocumentModal from "@/components/modals/create-document/create-document-modal";
import EditDocumentModal from "@/components/modals/edit-document/edit-document-modal";
import { toast } from "sonner";

export default function Page() {
  const { projectId } = useParams();
  const router = useRouter();
  const { data, isLoading: loadingDatabase, mutate, error } = useSWR(`/api/v1/databases/${projectId}`, fetcher);
  const [isOpenCollectionModal, setIsOpenCollectionModal] = React.useState(false);
  const [isOpenDocumentModal, setIsOpenDocumentModal] = React.useState(false);
  const [isOpenEditDocumentModal, setIsOpenEditDocumentModal] = React.useState(false);
  const [collectionId, setCollectionId] = useQueryState("~C1");
  const [documentId, setDocumentId] = useQueryState("~D1");

  const handleDeleteCollection = async (collectionKey: string) => {
    try {
      await fetch(`/api/v1/databases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectId,
          method: "clear",
          params: [collectionKey]
        })
      });

      await mutate();
    } catch (e) {
      console.error("Failed to delete the collection", e);
    }
  };

  const handleDeleteDocument = async (collectionKey: string, documentId: string) => {
    try {
      await fetch(`/api/v1/databases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectId,
          method: "delete",
          params: [`${collectionKey}/${documentId}`]
        })
      });

      await mutate();
    } catch (e) {
      console.error("Failed to delete the document", e);
    }
  };

  useEffect(() => {
    if (data) {
      if (collectionId && !data[collectionId]) {
        setCollectionId(null);
        setDocumentId(null);
      } else if (
        collectionId &&
        documentId &&
        (!data[collectionId] || !data[collectionId].some((item: any) => item.id === documentId))
      ) {
        setDocumentId(null);
      }
    }
  }, [data, collectionId, documentId, setCollectionId, setDocumentId]);

  useEffect(() => {
    if (error) return router.push("/app/projects");
  }, [error, router]);

  if (loadingDatabase) return <></>;

  return (
    <div>
      <div className={"flex justify-between items-center py-4 gap-4"}>
        <h2 className={"text-5xl font-bold mb-5 relative"}>Data <span className={"text-sm font-mono text-green-500 uppercase bg-green-200 p-1"}>realtime</span>
        </h2>
        <div className={"flex gap-2"}>
          <Button disabled variant={"outline"} onClick={() => router.push(`/app/projects/${projectId}/monitoring`)}><MonitorIcon/>Monitor</Button>
          <Button onClick={() => router.push(`/app/projects/${projectId}/manage`)}><GearIcon/>Settings</Button>
        </div>
      </div>
      <div className={"w-full h-[600px] grid grid-cols-[1fr_1fr_2fr] bg-neutral-50 dark:bg-neutral-950 text-neutral-500"}>
        <div className={"flex flex-col overflow-y-auto overflow-x-hidden border border-neutral-900 relative"}>
          <div className={"text-center p-3 sticky inset-0 bg-black text-white h-12 font-semibold"}>Collections</div>
          <Dialog open={isOpenCollectionModal} onOpenChange={setIsOpenCollectionModal}>
            <DialogTrigger>
              <div className={"p-2 text-blue-400 font-semibold hover:cursor-pointer flex gap-1 items-center hover:bg-blue-50 dark:hover:bg-blue-300/10"}>
                <PlusCircleIcon size={12}/>Start collection
              </div>
            </DialogTrigger>
            <CreateCollectionModal mutate={mutate} handleClose={() => setIsOpenCollectionModal(false)}/>
          </Dialog>

          {data && Object.keys(data).map((label, i) => (
            <ListItem
              onClickSecondary={() => handleDeleteCollection(label)}
              active={collectionId === label} label={label} key={i} onClick={async () => {
              await setCollectionId(label);
              await setDocumentId(null);
            }}
            />
          ))}
        </div>
        <div className={"flex flex-col overflow-y-auto border-b border-t border-neutral-900"}>
          <div className={"text-center p-3 sticky inset-0  bg-black text-white h-12 font-semibold"}>{data && collectionId ? collectionId : "Documents"}</div>
          {data && collectionId && (
            <Dialog open={isOpenDocumentModal} onOpenChange={setIsOpenDocumentModal}>
              <DialogTrigger>
                <div className={"p-2 text-blue-400 font-semibold hover:cursor-pointer flex gap-1 items-center hover:bg-blue-50 dark:hover:bg-blue-300/10"}>
                  <PlusCircleIcon size={12}/>Start document
                </div>
              </DialogTrigger>
              <CreateDocumentModal mutate={mutate} handleClose={() => setIsOpenDocumentModal(false)}/>
            </Dialog>
          )}
          {data && collectionId && Array.isArray(data[collectionId]) && data[collectionId].map((item: any) => (
            <ListItem
              onClickSecondary={() => handleDeleteDocument(collectionId, item.id)}
              active={documentId === item.id}
              label={item.id}
              key={item.id}
              onClick={() => setDocumentId(item.id)}
            />
          ))}
        </div>
        <div className={"border border-neutral-900"}>
          <div className={"flex justify-between items-center p-3 sticky inset-0 bg-black text-white h-12"}>
            <div className="font-semibold">{data && collectionId && documentId ? documentId : null}</div>
            {data && collectionId && documentId && (
              <Dialog open={isOpenEditDocumentModal} onOpenChange={setIsOpenEditDocumentModal}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-400 border-blue-400 bg-blue-400/50 hover:bg-blue-600/50 hover:text-white dark:bg-blue-400/20 dark:hover:bg-blue-400/50 dark:text-white"
                  >
                    <EditIcon size={16} className="mr-1"/> Edit
                  </Button>
                </DialogTrigger>
                <EditDocumentModal
                  mutate={mutate}
                  handleClose={() => setIsOpenEditDocumentModal(false)}
                  collectionId={collectionId}
                  documentId={documentId}
                  documentData={data[collectionId]?.find((item: any) => item.id === documentId)}
                />
              </Dialog>
            )}
          </div>
          <div className="overflow-y-auto">
            {data && collectionId && documentId ? (
              <div>
                {(() => {
                  const documentData = data[collectionId]?.find((item: any) => item.id === documentId);
                  if (!documentData) return null;

                  return (
                    <table className="w-full border-collapse">
                      <tbody>
                        {Object.entries(documentData).map(([key, value], index) => (
                          <tr key={key} className={index % 2 === 0 ? "bg-white dark:bg-neutral-900" : "bg-gray-50 dark:bg-neutral-800"}>
                            <td className="py-2 px-4 border-b border-neutral-200 dark:border-neutral-700 font-medium text-neutral-700 dark:text-neutral-300 w-1/3">
                              {key}
                            </td>
                            <td className="py-2 px-4 border-b border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200">
                              {typeof value === 'object' ? (
                                <pre className="font-mono text-sm whitespace-pre-wrap">
                                  {JSON.stringify(value, null, 2)}
                                </pre>
                              ) : (
                                <span className="font-mono">{String(value)}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center text-neutral-500 p-4">Select a document to view its content</div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-neutral-500 mt-4">
        The database visualizer is currently under development. Stay tuned for new updates!
      </div>
    </div>
  );
}

interface ListItemProps extends React.HTMLProps<HTMLDivElement> {
  label: string;
  active: boolean;
  className?: string;
  onClickSecondary?: () => void;
}

const ListItem = ({ label, active, className, onClickSecondary, ...rest }: ListItemProps) => {
  return <div {...rest} className={cn("p-2 flex items-center justify-between hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50 hover:text-zinc-950 dark:hover:text-zinc-50 hover:cursor-pointer w-full sm:w-auto whitespace-nowrap group h-12 min-h-[3rem] max-h-[3rem]", className, active && "bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50")}>
    {label}
    <Button
      onClick={(e) => {
        e.stopPropagation();
        onClickSecondary?.();
        toast("Item successfully deleted.", {
          duration: 700,
          icon: <MinusCircleIcon size={12}/>,
        });
      }}
      variant={"destructive"}
      size={"icon"}
      className={"bg-zinc-300 dark:bg-zinc-600 dark:hover:bg-red-400 shadow-none hidden group-hover:flex"}
    ><MinusCircleIcon/>
    </Button>
  </div>;
};
