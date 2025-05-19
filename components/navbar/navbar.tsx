"use client";

import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton, useAuth, useOrganization,
  UserButton,
  useUser
} from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle/mode-toggle";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function Navbar() {
  const { user } = useUser();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
      <div className="flex items-center gap-2 relative">
        <Image
          src="/logo_large_dark.svg"
          alt="Logo"
          width={60}
          height={60}
          className="size-9 object-cover filter grayscale hover:cursor-pointer dark:invert"
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

        <Button variant={"outline"} className={"p-0 h-fit w-fit"} size={"icon"}>
          <OrganizationSwitcher
            appearance={{
              baseTheme: resolvedTheme === "dark" ? dark : undefined
            }}
            afterSelectPersonalUrl={() => `/app/projects`}
            afterSelectOrganizationUrl={() => `/app/projects`}
            afterCreateOrganizationUrl={() => `/app/projects`}
          />
        </Button>

      </div>
      <div className="flex gap-4 items-center">
        <SignedOut>
          <SignInButton/>
          <SignUpButton/>
        </SignedOut>
        <SignedIn>
          <Link href={"https://narodb.netlify.app/"} target={"_blank"} className={"hover:opacity-80"}>Docs</Link>
          <Link href={"/pricing"} className={"hover:opacity-80"}>Pricing</Link>
          <ModeToggle/>
          <Button size={"icon"} variant={"outline"}>
            <UserButton appearance={{
              baseTheme: resolvedTheme === "dark" ? dark : undefined
            }}/>
          </Button>
        </SignedIn>
      </div>
    </header>
  );
}
