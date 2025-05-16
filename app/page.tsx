"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AnimatedBeamMultipleOutputDemo } from "@/components/animated-beam/animate-beam";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function Home() {
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
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[130%] skew-y-12"
          )}
        />

        <div className={"absolute z-10 top-0 left-0 font-mono h-dvh w-full overflow-auto"}>
          <header className="flex justify-between items-center p-1 backdrop-blur-lg border-b sticky top-0 left-0 z-20 h-20 px-4">
            <div className={"flex items-center space-x-2"}>
              <Image src={"/logo_large_dark.svg"} alt={""} width={100} height={100} className="size-10"/>
              <h1 className="text-lg md:text-xl lg:text-2xl font-semibold hidden sm:block">Narobase</h1>
            </div>
            <div className={"flex items-center space-x-4"}>
              <Link href={"https://narodb.netlify.app/"} target={"_blank"} className={"hover:opacity-80"}>Docs</Link>
              <Link href={"#"} className={"hover:opacity-80"}>Pricing</Link>
              <SignedIn>
                <Link
                  href={"/app/projects"}
                  className="relative bg-black text-white p-4 cursor-pointer
    before:content-[''] before:absolute before:inset-0 before:bg-red-500
    before:transition-transform before:duration-300 before:z-[-1]
    hover:before:translate-x-[-10%] hover:before:translate-y-[10%]"
                >
                  Dashboard
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl={"/app/projects"}>
                  <button
                    className="relative bg-black text-white p-4 cursor-pointer
    before:content-[''] before:absolute before:inset-0 before:bg-red-500
    before:transition-transform before:duration-300 before:z-[-1]
    hover:before:translate-x-[-10%] hover:before:translate-y-[10%]"
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </header>

          <main className={"p-10 sm:mt-5 flex"}>
            <div className={"flex-9/12"}>
              <div className={"text-4xl sm:text-5xl md:text-6xl lg:text-6xl md:text-center"}>
                <div className="font-bold">
                  <AuroraText className="italic" speed={10}>Open Source</AuroraText>
                </div>
                <div className="font-bold">IMDB Engineering</div>
                <div className="font-bold">Platform</div>
              </div>

              <AnimatedBeamMultipleOutputDemo className={"p-5 my-20 h-72"}/>

              <div className={"text-md mt-10 text-center"}>NaroDB runs entirely in memory for real-time
                speed you can feel.
              </div>

              <div className={"flex space-x-2 mt-10 md:justify-center"}>
                <SignedOut>
                  <SignInButton mode="modal" forceRedirectUrl={"/app/projects"}>
                    <button
                      className="relative bg-black text-white p-4 cursor-pointer
    before:content-[''] before:absolute before:inset-0 before:bg-teal-500
    before:transition-transform before:duration-300 before:z-[-1]
    hover:before:translate-x-[-10%] hover:before:translate-y-[10%]"
                    >Try demo
                    </button>
                  </SignInButton>
                </SignedOut>

                <Link
                  href={"https://github.com/bryanlundberg/naro-service"}
                  target={"_blank"}
                  className="relative text-black bg-white border p-4 cursor-pointer hover:bg-neutral-100 transition duration-300 flex items-center gap-2"
                >
                  <svg className={"size-4"} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title>GitHub</title>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                  Star on Github
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
