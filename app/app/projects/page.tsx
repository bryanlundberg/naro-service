"use client";

import {
  Dialog, DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { findFlagUrlByIso2Code } from "country-flags-svg";

import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const deFlag = findFlagUrlByIso2Code("DE");
  const snFlag = findFlagUrlByIso2Code("SG")
  const usFlag = findFlagUrlByIso2Code("US");
  const router = useRouter();

  return (
    <>


      <div className={"flex justify-between items-center p-4 gap-4"}>

        <div className={"flex flex-col gap-2"}>
          <h1 className={"font-black text-5xl"}>Projects</h1>
          <p className={"font-mono text-sm mt-3"}>The NaroBase projects are containers for your databases.</p>
        </div>


        <Dialog>
          <DialogTrigger asChild>
            <Button>
              New project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create project</DialogTitle>

              <form className={"space-y-2 pt-5"}>

                <Label htmlFor="engine">Engine</Label>
                <Select>
                  <SelectTrigger className={"w-full"}>
                    <SelectValue placeholder="engine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="naro">Naro</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="email">Project name</Label>
                <Input/>

                <Label htmlFor="region">Region</Label>
                <Select>
                  <SelectTrigger className={"w-full"}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frankfurt">
                      <Image src={deFlag} alt={deFlag} width={20} height={20} className={"inline-block me-2"}/>
                      <span className={"font-mono"}>Frankfurt (+- 503ms)</span>
                    </SelectItem>
                    <SelectItem value="singapore">
                      <Image src={snFlag} alt={snFlag} width={20} height={20} className={"inline-block me-2"}/>
                      <span className={"font-mono"}>Singapore (+- 822ms)</span>
                    </SelectItem>
                    <SelectItem value="washington">
                      <Image src={usFlag} alt={usFlag} width={20} height={20} className={"inline-block me-2"}/>
                      <span className={"font-mono"}>Washington, D.C (+- 256ms)</span>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <DialogFooter className={"mt-5"} >
                  <DialogClose asChild>
                    <Button variant="outline" type={"button"}>Cancel</Button>
                  </DialogClose>
                  <Button>Create</Button>
                </DialogFooter>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

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

        {[1, 2, 3, 4, 5, 6, 76, 7, 8, 8].map((_, i) => (
          <tr onClick={() => router.push(`/app/projects/<id>`)} className={"h-10 hover:bg-neutral-300 hover:cursor-pointer"} key={i}>
            <td className={"font-mono text-sm ps-3"}>Project 1</td>
            <td className={"font-mono text-sm"}><Image src={findFlagUrlByIso2Code("DE")} alt={""}  width={20} height={20} className={"inline-block me-2"}/> <span>Frankfurt</span> </td>
            <td className={"font-mono text-sm text-red-500"}>OFF</td>
            <td className={"font-mono text-sm text-center"}>1 GB</td>
            <td className={"font-mono text-sm "}>
              <div className={"flex justify-center items-center h-full grow"}>
                <Link onClick={(e) => e.stopPropagation()} href={`/app/projects/123/manage`} className={"text-blue-500 hover:underline"}>Settings</Link>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}
