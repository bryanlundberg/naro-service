import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { useQueryState } from "nuqs";
import { useForm } from "react-hook-form";

interface CreateDocumentModalProps {
  mutate: VoidFunction;
  handleClose: VoidFunction;
}

export default function CreateDocumentModal({ mutate, handleClose }: CreateDocumentModalProps) {
  const [C1] = useQueryState("~C1");
  const { register, handleSubmit, formState: { errors }, setValue, getValues, watch } = useForm({
    defaultValues: {
      documentId: "",
      fields: [{ field: "", type: "", value: "" }]
    }
  });

  const addField = () => {
    setValue("fields", [
      ...(getValues("fields") || []),
      { field: "", type: "", value: "" }
    ]);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const fields = watch("fields"); // Watch fields to get dynamic updates

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add a document</DialogTitle>
      </DialogHeader>
      <div className={"space-y-2"}>
        <div>
          <Label htmlFor="collection-name" className="text-sm font-medium text-gray-700">Superior path</Label>
          <div>/{C1}</div>
        </div>
        <div>
          <Label htmlFor="collection-name" className="text-sm font-medium text-gray-700">Document ID</Label>
          <Input {...register("documentId", { required: "document ID is required" })} />
          {errors.documentId &&
            <span className="text-red-500 text-sm">{errors.documentId?.message?.toString()}</span>}
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">Fields</Label>
          <div className="space-y-2">
            {fields?.map((field, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  className="flex-1"
                  placeholder="Field"
                  {...register(`fields.${index}.field` as const, { required: "Field name is required" })}
                />
                <select
                  className="flex-1 border rounded-md p-2"
                  {...register(`fields.${index}.type` as const, { required: "Field type is required" })}
                >
                  <option value="">Select type</option>
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                </select>
                {field.type === "boolean" ? (
                  <select
                    className="flex-1 border rounded-md p-2"
                    {...register(`fields.${index}.value` as const, { required: "Field value is required" })}
                  >
                    <option value="">Select value</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                ) : (
                  <Input
                    className="flex-1"
                    placeholder="Value"
                    {...register(`fields.${index}.value` as const, { required: "Field value is required" })}
                  />
                )}
              </div>
            ))}
          </div>
          <Button type="button" onClick={addField} className="mt-2">Add Field</Button>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild><Button variant={"ghost"}>Cancel</Button></DialogClose>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>Create</Button>
      </DialogFooter>
    </DialogContent>
  );
}
