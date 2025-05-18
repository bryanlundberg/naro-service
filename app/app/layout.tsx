import Navbar from "@/components/navbar/navbar";
import React from "react";
import { ClerkLoaded } from "@clerk/nextjs";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Background from "@/components/background/background";
import { LoaderProvider } from "@/components/naro-base-loader/loader-context";

export const metadata: Metadata = {
  title: "Narobase | Console for NaroDB",
  description: "Deploy your NaroDB instance in seconds"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NuqsAdapter>
        <LoaderProvider>
          <div className={"relative w-full max-h-dvh overflow-hidden hidden md:block"}>
            <Background/>
            <div className={"absolute top-0 left-0 w-full h-full z-10 overflow-auto"}>
              <Navbar/>
              <div className={"max-w-7xl mx-auto p-4"}>
                <ClerkLoaded>
                  {children}
                </ClerkLoaded>
              </div>
            </div>
          </div>

          <div className={"md:hidden flex flex-col gap-10 justify-center items-center p-10 text-center"}>We&apos;re sorry, but
            this website is currently optimized for bigger resolutions.
            Please visit us on a larger screen.

            <video src={"/shocked-surprised.mp4"} className={"w-full max-w-96"} controls={false} autoPlay muted loop/>
          </div>
        </LoaderProvider>
      </NuqsAdapter>
    </>
  );
}
