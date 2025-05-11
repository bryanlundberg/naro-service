import Navbar from "@/components/navbar/navbar";
import React from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { ClerkLoaded } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={"relative w-full max-h-dvh overflow-hidden hidden md:block"}>
        <FlickeringGrid
          className="relative inset-0 z-0 mx-auto"
          squareSize={40}
          gridGap={6}
          maxOpacity={0.02}
          flickerChance={0.9}
          height={1080}
          width={1980}
        />
        <div className={"absolute top-0 left-0 w-full h-full z-10 overflow-auto"}>
          <Navbar/>
          <div className={"max-w-7xl mx-auto p-4"}>
            <ClerkLoaded>
              {children}
            </ClerkLoaded>
          </div>
        </div>
      </div>

      <div className={"md:hidden"}>We’re sorry, but this website is currently optimized for bigger resolutions.
        Please visit us on a larger screen.
      </div>
    </>

  );
}
