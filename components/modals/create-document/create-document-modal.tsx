import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { useQueryState } from "nuqs";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CircleMinusIcon, PlusCircleIcon } from "lucide-react";
import { useParams } from "next/navigation";

interface CreateDocumentModalProps {
  mutate: VoidFunction;
  handleClose: VoidFunction;
}

export default function CreateDocumentModal({ mutate, handleClose }: CreateDocumentModalProps) {
  const [C1] = useQueryState("~C1");
  const { projectId } = useParams();
  const { register, handleSubmit, formState: { errors }, setValue, getValues, watch, control } = useForm({
    defaultValues: {
      documentId: "",
      fields: [{ field: "", type: "string", value: "" }]
    }
  });

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
        body: JSON.stringify({
          method: "set",
          params: [`${C1}/${data.documentId}`, fields],
          projectId
        })
      });
      mutate();
      handleClose();

      setTimeout(() => {
        setValue("documentId", "");
        setValue("fields", [{ field: "", type: "string", value: "" }]);
      }, 600);
    } catch (e) {
      console.error("Error submitting data:", e);
    }
  };

  const fields = watch("fields");

  const handleAutomaticId = () => {
    return setValue("documentId", Date.now().toString(36) + Math.random().toString(36).slice(2, 11));
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add a document</DialogTitle>
      </DialogHeader>
      <div className={"space-y-2"}>
        <div>
          <Label htmlFor="collection-name" className="text-sm font-medium text-gray-700">Superior path</Label>
          <div className={"text-sm"}>/{C1}</div>
        </div>
        <div>
          <Label htmlFor="collection-name" className="text-sm font-medium text-gray-700">Document ID</Label>
          <div className={"flex gap-2"}>
            <Input {...register("documentId", { required: "document ID is required" })} />
            <Button variant={"ghost"} onClick={handleAutomaticId}>Automatic ID</Button>
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
                  {...register(`fields.${index}.field` as const, { required: "Field name is required" })}
                />

                <Controller
                  rules={{ required: "Field type is required" }}
                  render={({ field: { onChange, value } }) => (
                    <Select value={value} onValueChange={onChange}>
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
                    render={({ field: { onChange, value } }) => (
                      <Select value={value} onValueChange={(newValue) => setValue(`fields.${index}.value`, newValue)
                      }>
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
        >Create</Button>
      </DialogFooter>
    </DialogContent>
  );
}
