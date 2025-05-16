"use client";

import axios from 'redaxios';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { orderBy } from "lodash";
import { findFlagUrlByIso2Code } from "country-flags-svg";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useOrganization, useUser } from "@clerk/nextjs";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Loader from "@/components/loader/loader";

export default function Page() {
  const deFlag = findFlagUrlByIso2Code("DE");
  const snFlag = findFlagUrlByIso2Code("SG");
  const usFlag = findFlagUrlByIso2Code("US");
  const router = useRouter();
  const { user } = useUser();
  const { organization } = useOrganization();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: projects, isLoading, mutate } = useSWR(`/api/v1/projects/${organization ? organization?.id : user?.id}`, fetcher);
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      engine: "naro",
      projectName: "",
      region: "DE"
    }
  });

  const handleCreateProject = async (data: any) => {
    try {
      const orgId = organization ? organization.id : user?.id
      const response = await axios.post(`/api/v1/projects/${orgId}`, { ...data, orgId });
      await mutate();
      setIsModalOpen(false);
      router.push(`/app/projects/${response.data.id}/manage`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className={"flex justify-between items-center p-4 gap-4"}>

        <div className={"flex flex-col gap-2"}>
          <h1 className={"font-black text-5xl"}>Projects</h1>
          <p className={"font-mono text-sm mt-3"}>The NaroBase projects are containers for your databases.</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              New project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create project</DialogTitle>

              <form className={"space-y-2 pt-5"} onSubmit={handleSubmit(handleCreateProject)}>

                <Label htmlFor="email">Project name</Label>
                <Input autoComplete={"off"} {...register("projectName", {
                  required: "Project name is required",
                  minLength: {
                    value: 3,
                    message: "Project name must be at least 3 characters long"
                  },
                  maxLength: {
                    value: 20,
                    message: "Project name must be at most 20 characters long"
                  }
                })}/>
                {errors.projectName && <p className={"text-red-500 text-sm"}>{errors.projectName.message}</p>}

                <Label htmlFor="engine">Engine</Label>
                <Controller
                  name={"engine"}
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={"w-full"}>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="naro">Naro</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                <Label htmlFor="region">Region</Label>
                <Controller
                  name={"region"}
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={"w-full"}>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DE">
                          <Image src={deFlag} alt={deFlag} width={20} height={20} className={"inline-block me-2"}/>
                          <span className={"font-mono"}>Frankfurt</span>
                        </SelectItem>
                        <SelectItem value="SG">
                          <Image src={snFlag} alt={snFlag} width={20} height={20} className={"inline-block me-2"}/>
                          <span className={"font-mono"}>Singapore</span>
                        </SelectItem>
                        <SelectItem value="US">
                          <Image src={usFlag} alt={usFlag} width={20} height={20} className={"inline-block me-2"}/>
                          <span className={"font-mono"}>Washington, D.C</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                <DialogFooter className={"mt-5"}>
                  <DialogClose asChild>
                    <Button variant="outline" type={"button"}>Cancel</Button>
                  </DialogClose>
                  <Button type={"submit"}>Create</Button>
                </DialogFooter>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? <Loader/> : (
        projects && projects.length > 0 ? (
          <table className={"w-full mt-5 border border-gray-400"}>
            <thead className={"h-16 text-center bg-black text-white"}>
            <tr className={"font-mono"}>
              <th className={"ps-3 text-left"}>Name</th>
              <th className={"text-left"}>Region</th>
              <th className={"text-left"}>Backup</th>
              <th className={"text-center"}>Storage</th>
              <th className={"text-center"}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {orderBy(projects, "createdAt", "desc").map((project) => (
              <tr
                onClick={() => router.push(`/app/projects/${project.id}`)}
                className={"h-10 hover:bg-neutral-300 hover:cursor-pointer"}
                key={project.id}
              >
                <td className={"font-mono text-sm ps-3"}>{project.projectName}</td>
                <td className={"font-mono text-sm"}>
                  <Image
                    src={findFlagUrlByIso2Code(project.region) || ""}
                    alt={"region flag"}
                    width={20}
                    height={20}
                    className={"inline-block me-2"}
                  />
                  <span>{project.region === "DE" ? "Frankfurt" : project.region === "SN" ? "Singapore" : "Washington, D.C"}</span>
                </td>
                <td className={"font-mono text-sm text-red-500"}>OFF</td>
                <td className={"font-mono text-sm text-center"}>1 GB</td>
                <td className={"font-mono text-sm "}>
                  <div className={"flex justify-center items-center h-full grow"}>
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      href={`/app/projects/${project.id}/manage`}
                      className={"text-blue-500 hover:underline"}
                    >
                      Settings
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        ) : (
          <div
            className={"w-full border border-dashed h-96 flex flex-col justify-center hover:cursor-pointer items-center bg-neutral-50 rounded-md mt-5 border-neutral-900"}
            onClick={() => setIsModalOpen(true)}
          >
            <h1 className={"font-mono text-xl"}>No projects found</h1>
            <p className={"font-mono text-sm mt-3"}>Create a new project to get started.</p>
          </div>
        )
      )}
    </>
  );
}
