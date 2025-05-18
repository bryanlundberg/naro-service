import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CircleMinusIcon, PlusCircleIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { ShineBorder } from "@/components/magicui/shine-border";

interface EditDocumentModalProps {
  mutate: VoidFunction;
  handleClose: VoidFunction;
  collectionId: string;
  documentId: string;
  documentData: any;
}

export default function EditDocumentModal({ mutate, handleClose, collectionId, documentId, documentData }: EditDocumentModalProps) {
  const { projectId } = useParams();

  const convertDocumentToFields = (doc: any) => {
    return Object.entries(doc).map(([key, value]) => {
      const type = typeof value === 'boolean' ? 'boolean' : (typeof value === 'number' ? 'number' : 'string');

      return {
        field: key,
        type,
        // @ts-ignore
        value: type === 'boolean' ? (value ? 'true' : 'false') : value.toString()
      };
    });
  };

  const { register, handleSubmit, formState: { errors }, setValue, getValues, watch, control, reset } = useForm({
    defaultValues: {
      documentId: documentId,
      fields: documentData ? convertDocumentToFields(documentData) : [{ field: "", type: "string", value: "" }]
    }
  });

  useEffect(() => {
    if (documentData) {
      reset({
        documentId: documentId,
        fields: convertDocumentToFields(documentData)
      });
    }
  }, [documentData, documentId, reset]);

  const addField = () => {
    setValue("fields", [
      ...(getValues("fields") || []),
      { field: "", type: "string", value: "" }
    ]);
  };

  const removeField = (index: number) => {
    const updatedFields = [...(getValues("fields") || [])];
    updatedFields.splice(index, 1);
    setValue("fields", updatedFields);
  };

  const onSubmit = async (data: any) => {
    const fields = data.fields.reduce((acc: Record<string, any>, field: any) => {
      acc[field.field] = field.type === "boolean" ? field.value === "true" : (field.type === "number" ? Number(field.value) : field.value);
      return acc;
    }, {});

    try {
      await fetch(`/api/v1/databases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          method: "update",
          params: [`${collectionId}/${data.documentId}`, fields],
          projectId
        })
      });
      mutate();
      handleClose();
    } catch (e) {
      console.error("Error updating document:", e);
    }
  };

  const fields = watch("fields");

  return (
    <DialogContent>
      <ShineBorder shineColor={"gray"}/>
      <DialogHeader>
        <DialogTitle>Edit document</DialogTitle>
      </DialogHeader>
      <div className={"space-y-2"}>
        <div>
          <Label htmlFor="collection-name" className="text-sm font-medium text-gray-700">Superior path</Label>
          <div className={"text-sm"}>/{collectionId}</div>
        </div>
        <div>
          <Label htmlFor="collection-name" className="text-sm font-medium text-gray-700">Document ID</Label>
          <div className={"flex gap-2"}>
            <Input {...register("documentId", { required: "document ID is required" })} disabled />
          </div>
          {errors.documentId &&
            <span className="text-red-500 text-sm">{errors.documentId?.message?.toString()}</span>}
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-700">Fields</Label>
          <div className="space-y-2">
            {fields?.map((field, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <Input
                  className="flex-1"
                  placeholder="Field"
                  autoComplete={"off"}
                  disabled={field.field === "id" || field.field === "createdAt" || field.field === "path"}
                  {...register(`fields.${index}.field` as const, { required: "Field name is required" })}
                />

                <Controller
                  rules={{ required: "Field type is required" }}
                  render={({ field: { onChange, value } }) => (
                    <Select value={value} onValueChange={onChange} disabled={field.field === "id" || field.field === "createdAt" || field.field === "path"}>
                      <SelectTrigger className={"w-32"}>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                      </SelectContent>
                    </Select>
                  )} name={`fields.${index}.type`} control={control}
                />

                {field.type === "boolean" ? (
                  <Controller
                    render={({ field: { value } }) => (
                      <Select
                        value={value}
                        onValueChange={(newValue) => setValue(`fields.${index}.value`, newValue)}
                        disabled={field.field === "id" || field.field === "createdAt" || field.field === "path"}
                      >
                        <SelectTrigger className={"flex-1"}>
                          <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                    name={`fields.${index}.value`}
                    control={control}
                    rules={{ required: "Field is required" }}
                  />
                ) : (
                  <Input
                    className="p-2 flex-1"
                    placeholder="Value"
                    autoComplete={"off"}
                    disabled={field.field === "id" || field.field === "createdAt" || field.field === "path"}
                    {...register(`fields.${index}.value` as const, {
                      required: "Field value is required",
                      pattern: fields[index]?.type === "number"
                        ? { value: /^[0-9]*$/, message: "Must be numeric" }
                        : undefined
                    })}
                  />
                )}

                {index === 0 && (<div className={"w-9"}></div>)}
                {index > 0 && (<Button
                  variant={"ghost"}
                  size={"icon"}
                  type="button"
                  onClick={() => removeField(index)}
                  disabled={field.field === "id" || field.field === "createdAt" || field.field === "path"}
                ><CircleMinusIcon/></Button>)}
              </div>
            ))}
          </div>
          <Button variant={"ghost"} type="button" onClick={addField} className="mt-2"><PlusCircleIcon/>Add
            Field</Button>
        </div>
      </div>

      <div className={"w-full border-b"}></div>
      <DialogFooter>
        <DialogClose asChild><Button variant={"ghost"}>Cancel</Button></DialogClose>
        <Button
          disabled={!fields?.every(field => field.field && field.type && field.value)}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >Update</Button>
      </DialogFooter>
    </DialogContent>
  );
}
