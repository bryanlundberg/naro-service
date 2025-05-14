import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";

interface CreateCollectionModalProps {
  mutate: VoidFunction;
  handleClose: VoidFunction;
}

export default function CreateCollectionModal({ mutate, handleClose }: CreateCollectionModalProps) {
  const { projectId } = useParams();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      "collection-name": ""
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const req: any = await fetch(`/api/v1/databases`, {
        method: "POST",
        body: JSON.stringify({
          method: "add",
          params: [data["collection-name"], { x: "x" }],
          projectId
        })
      });

      const doc = await req.json();

      await fetch(`/api/v1/databases`, {
        method: "POST",
        body: JSON.stringify({
          method: "delete",
          params: [doc.path],
          projectId
        })
      });

      mutate();
      handleClose();

      setTimeout(() => {
        setValue("collection-name", "");
      }, 600);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setValue("collection-name", "");
  }, []);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Start a collection</DialogTitle>
      </DialogHeader>
      <div className={"space-y-2"}>
        <div>
          <Label htmlFor="collection-name" className="text-sm font-medium text-gray-700">Path</Label>
          <div>/</div>
        </div>
        <div>
          <Label htmlFor="collection-name" className="text-sm font-medium text-gray-700">Collection ID</Label>
          <Input {...register("collection-name", {
            required: "Collection ID is required"
          })}/>
          {errors["collection-name"] &&
            <span className="text-red-500 text-sm">{errors["collection-name"]?.message?.toString()}</span>}
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild><Button variant={"ghost"}>Cancel</Button></DialogClose>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>Create</Button>
      </DialogFooter>
    </DialogContent>
  );
}
