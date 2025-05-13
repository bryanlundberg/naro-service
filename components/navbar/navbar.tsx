"use client";

import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser
} from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
      <div className="flex items-center gap-2 relative">
        <Image
          src="/logo_large_dark.svg"
          alt="Logo"
          width={60}
          height={60}
          className="size-9 object-cover filter grayscale hover:cursor-pointer"
          onClick={user ? () => router.push("/app/projects") : () => router.push("/")}
        />

        <div
          onClick={user ? () => router.push("/app/projects") : () => router.push("/")}
          className={"absolute left-20 hidden lg:block bottom-0 text-red-500 font-black text-xs -skew-6 select-none hover:cursor-pointer"}
        >Alpha
        </div>
        <h3
          onClick={user ? () => router.push("/app/projects") : () => router.push("/")}
          className="font-bold text-lg font-mono hidden lg:block select-none hover:cursor-pointer"
        >NaroBase</h3>

        <div className={"select-none"}>/</div>

        <OrganizationSwitcher
          afterSelectPersonalUrl={() => `/app/projects`}
          afterSelectOrganizationUrl={() => `/app/projects`}
        />

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
