"use client";

import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useOrganization,
  useOrganizationList,
  UserButton,
  useSession,
  useUser
} from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useUser();
  const { userMemberships } = useOrganizationList();
  const asd = useOrganization();
  const ses = useSession();
  const router = useRouter();

  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
      <div className="flex items-center gap-2 relative">
        <Image
          src="/logo_large_dark.svg"
          alt="Logo"
          width={60}
          height={60}
          className="size-10 object-cover filter grayscale hover:cursor-pointer"
          onClick={user ? () => router.push("/app/projects") : () => router.push("/")}
        />

        <div className={"absolute left-20 hidden lg:block bottom-0 text-red-500 font-black text-xs -skew-6 select-none"}>Alpha</div>
        <h3 className="font-bold text-lg font-mono hidden lg:block select-none">NaroBase</h3>

        <div className={"select-none"}>/</div>

        <OrganizationSwitcher afterSelectOrganizationUrl={(org) => `/app/projects/${org.id}`} />

        <div className={"select-none"}>/</div>

        <Select>
          <SelectTrigger className="w-[180px] border-none hover:bg-gray-100 px-2 text-sm hover:cursor-pointer">
            <SelectValue placeholder="Application"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">6543654765</SelectItem>
            <SelectItem value="dark">874247564</SelectItem>
          </SelectContent>
        </Select>

      </div>
      <div className="flex gap-4">
        <SignedOut>
          <SignInButton/>
          <SignUpButton/>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
    </header>
  );
}
