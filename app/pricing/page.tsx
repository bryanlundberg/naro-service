"use client";

import { PricingTable, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import React from "react";
import { ModeToggle } from "@/components/mode-toggle/mode-toggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function PricingPage() {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <div className={"h-screen relative overflow-hidden"}>
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 9]
          ]}
          className={cn(
            "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-50%] h-[100%] absolute top-0 left-0 -z-10"
          )}
        />
        <div className={"relative font-mono h-dvh w-full overflow-auto"}>
          <header className="flex justify-between items-center p-1 bg-background backdrop-blur-lg border-b h-20 px-4">
            <div className="flex items-center gap-2 relative">
              <Link href="/">
                <Image
                  src="/logo_large_dark.svg"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="size-9 object-cover filter grayscale hover:cursor-pointer dark:invert"
                />
              </Link>
              <div
                className={"absolute left-20 hidden lg:block bottom-0 text-red-500 font-black text-xs -skew-6 select-none hover:cursor-pointer"}
              >Alpha
              </div>
              <Link href="/">
                <h3
                  className="font-bold text-lg font-mono hidden lg:block select-none hover:cursor-pointer"
                >NaroBase</h3>
              </Link>
            </div>
            <div className={"flex items-center space-x-4"}>
              <Link href={"https://narodb.netlify.app/"} target={"_blank"} className={"hover:opacity-80"}>Docs</Link>
              <Link href={"/pricing"} className={"hover:opacity-80 font-bold"}>Pricing</Link>
              <ModeToggle/>
              <SignedIn>
                <Link
                  href={"/app/projects"}
                  className="relative bg-black text-white p-4 cursor-pointer
    before:content-[''] before:absolute before:inset-0 before:bg-red-500
    before:transition-transform before:duration-300 before:z-[-1]
    hover:before:translate-x-[-4%] hover:before:translate-y-[10%]"
                >
                  Dashboard
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl={"/app/projects"}>
                  <button
                    className="relative bg-neutral-900 text-white p-4 cursor-pointer
    before:content-[''] before:absolute before:inset-0 before:bg-red-500
    before:transition-transform before:duration-300 before:z-[-1]
    hover:before:translate-x-[-4%] hover:before:translate-y-[10%]"
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </header>

          <main className="p-10 md:p-0 flex flex-col items-center">
            <div className="max-w-7xl w-full px-4 py-12">
              <BlurFade delay={0.1} inView>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8">
                  Simple, Transparent Pricing
                </h1>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <p className="text-xl text-center text-neutral-600 dark:text-neutral-400 mb-16 max-w-3xl mx-auto">
                  Choose the plan that&apos;s right for you and start building with NaroBase today.
                </p>
              </BlurFade>


              <BlurFade delay={0.3} inView>
                <div className={"w-full max-w-4xl mx-auto mb-10"}>
                  <PricingTable
                    newSubscriptionRedirectUrl={"/app/projects"}
                    forOrganizations
                    appearance={{
                      baseTheme: resolvedTheme === "dark" ? dark : undefined,
                    }}
                  />
                </div>
              </BlurFade>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
