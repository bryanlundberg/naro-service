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
    <header className="flex bg-background/50 justify-between items-center p-1 backdrop-blur-lg border-b z-10 h-20 px-6 transition-all duration-300">
      <div className="flex items-center gap-2 relative group">
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 opacity-0 blur-xl group-hover:opacity-70 transition duration-500"></div>
        <Image
          src="/logo_large_dark.svg"
          alt="Logo"
          width={60}
          height={60}
          className="size-10 object-cover filter grayscale hover:cursor-pointer dark:invert z-10 transition-transform duration-300 ease-out group-hover:scale-110"
          onClick={user ? () => router.push("/app/projects") : () => router.push("/")}
        />
        <div
          onClick={user ? () => router.push("/app/projects") : () => router.push("/")}
          className={"absolute left-20 hidden lg:block bottom-0 text-red-500 font-black text-xs -skew-6 select-none hover:cursor-pointer z-10"}
        >Alpha
        </div>
        <h3
          onClick={user ? () => router.push("/app/projects") : () => router.push("/")}
          className="font-bold text-xl font-mono hidden lg:block select-none hover:cursor-pointer z-10 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400"
        >NaroBase</h3>

        <div className={"select-none z-10"}>/</div>

        <Button variant={"ghost"} className={"p-0 h-fit w-fit z-10 bg-transparent hover:bg-transparent"} size={"icon"}>
          <OrganizationSwitcher
            appearance={{
              baseTheme: resolvedTheme === "dark" ? dark : undefined,
              elements: {
                rootBox: {
                  backgroundColor: "transparent"
                },
                organizationSwitcherTrigger: {
                  backgroundColor: "transparent",
                  color: resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
                  borderRadius: "8px",
                  padding: "4px 8px",
                  "&:hover": {
                    backgroundColor: resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    color: resolvedTheme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)",
                    transform: "scale(1.01)",
                    transition: "all 0.3s ease",
                    boxShadow: resolvedTheme === "dark" ? "0 0 8px rgba(255, 255, 255, 0.1)" : "0 0 8px rgba(0, 0, 0, 0.1)"
                  }
                }
              }
            }}
            afterSelectPersonalUrl={() => `/app/projects`}
            afterSelectOrganizationUrl={() => `/app/projects`}
            afterCreateOrganizationUrl={() => `/app/projects`}
          />
        </Button>

      </div>
      <div className="flex items-center space-x-6">
        <SignedOut>
          <SignInButton/>
          <SignUpButton/>
        </SignedOut>
        <SignedIn>
          <Link
            href={"https://narodb.netlify.app/"}
            target={"_blank"}
            className={"hover:opacity-80 relative group"}
          >
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            Docs
          </Link>
          <Link href={"/pricing"} className={"hover:opacity-80 relative group"}>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            Pricing
          </Link>
          <ModeToggle/>
          <Button size={"icon"} variant={"ghost"} className={"bg-transparent hover:bg-transparent"}>
            <UserButton appearance={{
              baseTheme: resolvedTheme === "dark" ? dark : undefined,
              elements: {
                rootBox: {
                  backgroundColor: "transparent"
                },
                userButtonTrigger: {
                  backgroundColor: "transparent",
                  color: resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
                  borderRadius: "8px",
                  padding: "4px",
                  "&:hover": {
                    backgroundColor: resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    color: resolvedTheme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                    boxShadow: resolvedTheme === "dark" ? "0 0 8px rgba(255, 255, 255, 0.1)" : "0 0 8px rgba(0, 0, 0, 0.1)"
                  }
                },
                avatarBox: {
                  borderRadius: "50%",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                    boxShadow: resolvedTheme === "dark" ? "0 0 8px rgba(255, 255, 255, 0.15)" : "0 0 8px rgba(0, 0, 0, 0.15)"
                  }
                }
              }
            }}/>
          </Button>
        </SignedIn>
      </div>
    </header>
  );
}
