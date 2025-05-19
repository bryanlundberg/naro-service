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
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useOrganization, useUser } from "@clerk/nextjs";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, Settings } from "lucide-react";
import useHasAdmin from "@/hooks/useHasAdmin";
import useHasSubscription from "@/hooks/useHasSubscription";

export default function Page() {
  const hasSubscription = useHasSubscription();
  const deFlag = findFlagUrlByIso2Code("DE");
  const sgFlag = findFlagUrlByIso2Code("SG");
  const usFlag = findFlagUrlByIso2Code("US");
  const router = useRouter();
  const { user } = useUser();
  const isAdmin = useHasAdmin();
  const { organization } = useOrganization();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: projects,
    isLoading,
    mutate
  } = useSWR(`/api/v1/projects/${organization ? organization?.id : user?.id}`, fetcher);
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      engine: "naro",
      projectName: "",
      region: "DE"
    }
  });

  const handleCreateProject = async (data: any) => {
    try {
      if (!hasSubscription && projects.length >= 1) {
        return alert("You can only have one project in the free plan. Please upgrade to a paid plan to create more projects.");
      }

      if (hasSubscription && projects.length >= 5) {
        return alert("You can only have five projects in the paid plan. Please upgrade to a business plan to create more projects.");
      }

      const orgId = organization ? organization.id : user?.id;
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
          <h1 className={"font-black text-5xl"}>Instances</h1>
          <p className={"font-mono text-sm mt-3"}>The NaroBase instances are containers for your databases.</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <div></div>
          </DialogTrigger>
          <DialogContent>
            <ShineBorder shineColor={"gray"}/>
            <DialogHeader>
              <DialogTitle>Create project</DialogTitle>

              <form className={"space-y-2 pt-5"} onSubmit={handleSubmit(handleCreateProject)}>

                <Label htmlFor="email">Project name</Label>
                <Input
                  autoComplete={"off"} {...register("projectName", {
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
                          <Image src={sgFlag} alt={sgFlag} width={20} height={20} className={"inline-block me-2"}/>
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

      {isLoading ? <></> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
          {/* Create New Instance Card - Always First */}
          {isAdmin && (
            <Card
              className="cursor-pointer transition-all border border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-blue-900/20 bg-gradient-to-br from-white to-blue-50 dark:from-zinc-900 dark:to-blue-950/30"
              onClick={() => setIsModalOpen(true)}
            >
              <CardContent className="flex flex-col items-center justify-center h-full py-10">
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-400 p-3 mb-4 shadow-md shadow-blue-200 dark:shadow-blue-900/30">
                  <PlusIcon className="h-8 w-8 text-white"/>
                </div>
                <CardTitle className="text-xl mb-2 text-blue-600 dark:text-blue-400">Create New Instance</CardTitle>
                <CardDescription>Start a new database instance</CardDescription>
              </CardContent>
            </Card>
          )}

          {/* Existing Instances Cards */}
          {projects && projects.length > 0 ? (
            orderBy(projects, "createdAt", "desc").map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push(`/app/projects/${project.id}`)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{project.projectName}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Image
                      src={findFlagUrlByIso2Code(project.region) || ""}
                      alt={"region flag"}
                      width={20}
                      height={20}
                      className={"inline-block me-2"}
                    />
                    <span className="font-mono text-sm">
                      {project.region === "DE" ? "Frankfurt" : project.region === "SG" ? "Singapore" : project.region === "US" ? "Washington, D.C" : "Unknown"}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Backup</p>
                      <p className="font-medium text-red-500">OFF</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Storage</p>
                      <p className="font-medium">100 Mb</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/app/projects/${project.id}/manage`);
                    }}
                  >
                    <Settings className="h-4 w-4 mr-2"/>
                    Settings
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}
