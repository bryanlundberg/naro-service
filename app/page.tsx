"use client";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { AnimatedBeamMultipleOutputDemo } from "@/components/animated-beam/animate-beam";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import React from "react";
import { ModeToggle } from "@/components/mode-toggle/mode-toggle";
import {
  ArrowUpRightIcon,
  CheckCircle2,
  Database,
  Fingerprint,
  GitFork,
  Globe,
  Layers,
  Lock,
  Rocket,
  Sparkles,
  Zap
} from "lucide-react";
import { ShineBorder } from "@/components/magicui/shine-border";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { useTheme } from "next-themes";

export default function Home() {
  const { resolvedTheme } = useTheme();
  return (
    <>
      <div className={"h-screen relative"}>
        <div className={"font-mono w-full overflow-auto"}>
          <header className="flex bg-background/50 justify-between items-center p-1 backdrop-blur-lg border-b z-10 h-20 px-6 transition-all duration-300">
            <div className="flex items-center gap-2 relative group">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 opacity-0 blur-xl group-hover:opacity-70 transition duration-500"></div>
              <Image
                src="/logo_large_dark.svg"
                alt="Logo"
                width={60}
                height={60}
                className="size-10 object-cover filter grayscale hover:cursor-pointer dark:invert z-10 transition-transform duration-300 ease-out group-hover:scale-110"
              />
              <div
                className={"absolute left-20 hidden lg:block bottom-0 text-red-500 font-black text-xs -skew-6 select-none hover:cursor-pointer z-10"}
              >Alpha
              </div>
              <h3
                className="font-bold text-xl font-mono hidden lg:block select-none hover:cursor-pointer z-10 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400"
              >NaroBase</h3>
            </div>
            <div className={"flex items-center space-x-6"}>
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
              <SignedIn>
                <Link
                  href={"/app/projects"}
                  className="relative bg-black text-white p-4 cursor-pointer overflow-hidden group
    before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-500 before:to-purple-500
    before:transition-transform before:duration-300 before:ease-out before:z-[-1]
    hover:before:translate-x-[-4%] hover:before:translate-y-[10%]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket
                      size={16}
                      className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                    Dashboard
                  </span>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl={"/app/projects"} fallbackRedirectUrl={"/app/projects"}>
                  <button
                    className="relative bg-neutral-900 text-white p-4 cursor-pointer overflow-hidden group
    before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:to-purple-500
    before:transition-transform before:duration-300 before:ease-out before:z-[-1]
    hover:before:translate-x-[-4%] hover:before:translate-y-[10%]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles
                        size={16}
                        className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                      Sign In
                    </span>
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </header>

          <main className={"flex flex-col"}>
            {/* Hero Section */}
            <div className="relative px-6 lg:px-8 py-24 md:py-32 overflow-hidden">
              <div className="absolute inset-0 -z-10">
                <FlickeringGrid
                  squareSize={3}
                  gridGap={12}
                  color={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
                  maxOpacity={0.15}
                  flickerChance={0.2}
                />
              </div>

              <div className="mx-auto max-w-5xl">
                <div className="text-center">
                  <BlurFade delay={0.05} inView>
                    <Link href={"https://github.com/narodb/naro"} target={"_blank"}>
                      <AnimatedShinyText className="inline-flex text-xs items-center justify-center px-4 py-1 mb-6 transition ease-out hover:text-neutral-500 hover:duration-300 hover:dark:text-neutral-400 select-none bg-neutral-100 dark:bg-neutral-800 rounded-full">
                        <span>✨ NaroDB v0.2.6 just shipped</span>
                        <ArrowUpRightIcon size={12} className={"ms-1"}/>
                      </AnimatedShinyText>
                    </Link>
                  </BlurFade>

                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                    <BlurFade delay={0.1} inView>
                      <div className="font-bold relative">
                        <AuroraText className="italic" speed={10}>Open Source</AuroraText>
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
                      </div>
                    </BlurFade>
                    <BlurFade delay={0.1 * 2} inView>
                      <div className="font-bold capitalize">Built for Humans</div>
                    </BlurFade>
                    <BlurFade delay={0.1 * 3} inView>
                      <div className="font-bold capitalize">Database</div>
                    </BlurFade>
                  </div>

                  <BlurFade delay={0.1 * 4} inView>
                    <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                      A modern, lightweight, and developer-friendly database designed for simplicity and performance.
                      Perfect for applications of all sizes.
                    </p>
                  </BlurFade>

                  <BlurFade delay={0.1 * 5} inView>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <SignedOut>
                        <SignInButton mode="modal" forceRedirectUrl={"/app/projects"}>
                          <button className="relative bg-neutral-900 dark:bg-white dark:text-black text-white px-6 py-3 rounded-md cursor-pointer overflow-hidden group">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                            <span className="relative z-10 flex items-center gap-2">
                              <Rocket size={18} className="group-hover:animate-bounce"/>
                              Try demo
                            </span>
                          </button>
                        </SignInButton>
                      </SignedOut>

                      <Link
                        href={"https://github.com/narodb/naro"}
                        target={"_blank"}
                        className="relative text-black dark:text-white border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-md cursor-pointer uppercase transition duration-300 flex items-center gap-2 overflow-hidden group"
                      >
                        <span className="absolute inset-0 w-0 bg-neutral-100 dark:bg-neutral-800 transition-all duration-300 ease-out group-hover:w-full"></span>
                        <svg
                          className="size-5 relative z-10"
                          role="img"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>GitHub</title>
                          <path
                            fill="currentColor"
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                          />
                        </svg>
                        <span className="relative z-10">Star on Github</span>
                      </Link>
                    </div>
                  </BlurFade>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-100/30 to-transparent dark:via-neutral-900/30 -z-10"></div>
              <BlurFade delay={0.1 * 6} inView>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                    <div className="mx-auto flex max-w-xs flex-col gap-y-4 group">
                      <dt className="text-base leading-7 text-neutral-600 dark:text-neutral-400">Developers using
                        NaroDB
                      </dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                        <div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">10,000+</div>
                      </dd>
                    </div>
                    <div className="mx-auto flex max-w-xs flex-col gap-y-4 group">
                      <dt className="text-base leading-7 text-neutral-600 dark:text-neutral-400">Database operations per
                        day
                      </dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                        <div className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-amber-600 dark:from-red-400 dark:to-amber-400">1B+</div>
                      </dd>
                    </div>
                    <div className="mx-auto flex max-w-xs flex-col gap-y-4 group">
                      <dt className="text-base leading-7 text-neutral-600 dark:text-neutral-400">GitHub stars</dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                        <div className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">5,000+</div>
                      </dd>
                    </div>
                    <div className="mx-auto flex max-w-xs flex-col gap-y-4 group">
                      <dt className="text-base leading-7 text-neutral-600 dark:text-neutral-400">Average query time</dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                        <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">&lt;10ms</div>
                      </dd>
                    </div>
                  </dl>
                </div>
              </BlurFade>
            </div>

            {/* Demo Section */}
            <div className="py-16 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-100/50 to-transparent dark:via-neutral-900/50 -z-10"></div>
              <BlurFade delay={0.1 * 7} inView>
                <div className="text-center mb-8">
                  <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-3 py-1 text-sm font-medium text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-700/10 dark:ring-green-600/30 mb-4">
                    <Fingerprint size={14} className="mr-1"/> Simple Integration
                  </span>
                  <h2 className="text-3xl font-bold">See how it works</h2>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-4">Connect your application to NaroDB with
                    ease</p>
                </div>
                <AnimatedBeamMultipleOutputDemo className={"p-5 mx-auto max-w-4xl h-80"}/>
                <div className="text-md mt-6 text-center text-neutral-600 dark:text-neutral-400">
                  NaroBase is running entirely with NaroDB
                </div>
              </BlurFade>
            </div>

            {/* Features Section */}
            <div className="py-24 relative">
              <BlurFade delay={0.1 * 7} inView>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-600/30 mb-4">
                      <Sparkles size={14} className="mr-1"/> Powerful Features
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need in a database</h2>
                    <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400">
                      NaroDB combines simplicity with powerful features to make your development experience smooth and
                      efficient.
                    </p>
                  </div>
                  <div className="mx-auto mt-16 max-w-5xl sm:mt-20 lg:mt-24 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="relative p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 group hover:shadow-md transition-all duration-200">
                      <ShineBorder shineColor={["#3b82f6", "#8b5cf6"]}/>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-200">
                          <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400"/>
                        </div>
                        <h3 className="text-lg font-semibold">Lightning Fast</h3>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400">Optimized for speed with minimal overhead,
                        ensuring your applications run smoothly.</p>
                    </div>

                    <div className="relative p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 group hover:shadow-md transition-all duration-200">
                      <ShineBorder shineColor={["#10b981", "#6366f1"]}/>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors duration-300">
                          <Lock className="h-6 w-6 text-green-600 dark:text-green-400"/>
                        </div>
                        <h3 className="text-lg font-semibold">Secure by Default</h3>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400">Built with security in mind, protecting your
                        data with modern encryption standards.</p>
                    </div>

                    <div className="relative p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 group hover:shadow-md transition-all duration-200">
                      <ShineBorder shineColor={["#f59e0b", "#ef4444"]}/>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors duration-300">
                          <GitFork className="h-6 w-6 text-amber-600 dark:text-amber-400"/>
                        </div>
                        <h3 className="text-lg font-semibold">Open Source</h3>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400">Fully open source and community-driven,
                        ensuring transparency and continuous improvement.</p>
                    </div>

                    <div className="relative p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 group hover:shadow-md transition-all duration-200">
                      <ShineBorder shineColor={["#ec4899", "#8b5cf6"]}/>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30 group-hover:bg-pink-200 dark:group-hover:bg-pink-900/50 transition-colors duration-300">
                          <Globe className="h-6 w-6 text-pink-600 dark:text-pink-400"/>
                        </div>
                        <h3 className="text-lg font-semibold">Global Distribution</h3>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400">Deploy anywhere with seamless global
                        distribution for low-latency access worldwide.</p>
                    </div>

                    <div className="relative p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 group hover:shadow-md transition-all duration-200">
                      <ShineBorder shineColor={["#6366f1", "#3b82f6"]}/>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors duration-300">
                          <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400"/>
                        </div>
                        <h3 className="text-lg font-semibold">Flexible Schema</h3>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400">Adapt to changing requirements with a
                        flexible schema that evolves with your application.</p>
                    </div>

                    <div className="relative p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 group hover:shadow-md transition-all duration-200">
                      <ShineBorder shineColor={["#8b5cf6", "#ec4899"]}/>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors duration-300">
                          <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400"/>
                        </div>
                        <h3 className="text-lg font-semibold">Intuitive API</h3>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400">Simple and intuitive API designed for
                        developers, making integration a breeze.</p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* Testimonials Section */}
            <div className="py-24 bg-neutral-50 dark:bg-neutral-900/50 relative overflow-hidden">
              <div className="absolute inset-0 -z-10 opacity-50">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
              </div>

              <BlurFade delay={0.1 * 8} inView>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-xl text-center">
                    <span className="inline-flex items-center rounded-md bg-purple-50 dark:bg-purple-900/30 px-3 py-1 text-sm font-medium text-purple-700 dark:text-purple-300 ring-1 ring-inset ring-purple-700/10 dark:ring-purple-600/30 mb-4">
                      <CheckCircle2 size={14} className="mr-1"/> Trusted by Developers
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12">What developers are saying</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800/50 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                      <div className="absolute -top-4 -left-4 text-5xl text-neutral-200 dark:text-neutral-700">"</div>
                      <div className="relative">
                        <p className="text-neutral-700 dark:text-neutral-300 mb-6">NaroDB has simplified our database
                          architecture significantly. The API is intuitive and the performance is outstanding, even with
                          large datasets.</p>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            JS
                          </div>
                          <div>
                            <h4 className="font-semibold">Jamie Smith</h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Senior Developer at
                              TechCorp</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800/50 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                      <div className="absolute -top-4 -left-4 text-5xl text-neutral-200 dark:text-neutral-700">"</div>
                      <div className="relative">
                        <p className="text-neutral-700 dark:text-neutral-300 mb-6">We migrated from a traditional SQL
                          database to NaroDB and saw immediate improvements in both development speed and application
                          performance.</p>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white font-bold">
                            AR
                          </div>
                          <div>
                            <h4 className="font-semibold">Alex Rodriguez</h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">CTO at StartupX</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800/50 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                      <div className="absolute -top-4 -left-4 text-5xl text-neutral-200 dark:text-neutral-700">"</div>
                      <div className="relative">
                        <p className="text-neutral-700 dark:text-neutral-300 mb-6">The open-source nature of NaroDB
                          means we can contribute back to the project. It's great to be part of a community that values
                          transparency and collaboration.</p>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">
                            MP
                          </div>
                          <div>
                            <h4 className="font-semibold">Maria Patel</h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Lead Engineer at DevHub</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* CTA Section */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-neutral-900 to-black py-24 sm:py-32">
              <div className="absolute inset-0 -z-10 opacity-20">
                <FlickeringGrid
                  squareSize={4}
                  gridGap={8}
                  color="white"
                  maxOpacity={0.3}
                  flickerChance={0.4}
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>

              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                  <BlurFade delay={0.1 * 9} inView>
                    <span className="inline-flex items-center rounded-md bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-300 ring-1 ring-inset ring-blue-700/30 mb-4">
                      <Rocket size={14} className="mr-1"/> Ready to Launch
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Join the NaroDB
                      community</h2>
                    <p className="mt-6 text-lg leading-8 text-neutral-300">
                      Start building with NaroDB today and experience the difference. Our growing community of
                      developers is creating the next generation of database technology.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-6">
                      <SignedOut>
                        <SignInButton mode="modal" forceRedirectUrl={"/app/projects"}>
                          <button className="relative bg-white text-neutral-900 px-8 py-4 rounded-md cursor-pointer overflow-hidden group w-full sm:w-auto">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></span>
                            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300 font-medium">
                              <Sparkles size={18} className="group-hover:animate-pulse"/>
                              Get Started for Free
                            </span>
                          </button>
                        </SignInButton>
                      </SignedOut>

                      <Link
                        href={"https://github.com/narodb/naro"}
                        target={"_blank"}
                        className="text-white hover:text-blue-300 flex items-center gap-2 transition-colors duration-300 group"
                      >
                        <span>View on GitHub</span>
                        <ArrowUpRightIcon
                          size={16}
                          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                        />
                      </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                          <CheckCircle2 size={24}/>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">Free Open Source</h3>
                          <p className="mt-2 text-neutral-300">NaroDB is and will always remain open source and free to
                            use.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-purple-300">
                          <Zap size={24}/>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">Enterprise Ready</h3>
                          <p className="mt-2 text-neutral-300">Scale with confidence using our enterprise-grade features
                            and support.</p>
                        </div>
                      </div>
                    </div>
                  </BlurFade>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-neutral-100 dark:bg-neutral-900 py-16 relative overflow-hidden">
              <div className="absolute inset-0 -z-10 opacity-5">
                <FlickeringGrid
                  squareSize={2}
                  gridGap={10}
                  color="var(--foreground)"
                  maxOpacity={0.1}
                  flickerChance={0.1}
                />
              </div>

              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                  <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Image
                        src="/logo_large_dark.svg"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="size-8 object-cover filter grayscale dark:invert"
                      />
                      <span className="font-bold">NaroBase</span>
                      <span className="text-xs text-red-500 font-bold">Alpha</span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
                      A modern, open-source database designed for developers who value simplicity and performance.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-neutral-900 dark:text-white">Product</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href={"https://narodb.netlify.app/"}
                          target={"_blank"}
                          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >Documentation</Link>
                      </li>
                      <li>
                        <Link
                          href={"/pricing"}
                          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >Pricing</Link>
                      </li>
                      <li>
                        <Link
                          href={"#"}
                          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >Changelog</Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-neutral-900 dark:text-white">Resources</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href={"#"}
                          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >Blog</Link>
                      </li>
                      <li>
                        <Link
                          href={"#"}
                          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >Tutorials</Link>
                      </li>
                      <li>
                        <Link
                          href={"#"}
                          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >Support</Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 text-neutral-900 dark:text-white">Connect</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          href={"https://github.com/bryanlundberg/naro-service"}
                          target={"_blank"}
                          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"
                        >
                          <svg className="size-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <title>GitHub</title>
                            <path
                              fill="currentColor"
                              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                            />
                          </svg>
                          GitHub
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"#"}
                          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"
                        >
                          <svg className="size-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <title>Twitter</title>
                            <path
                              fill="currentColor"
                              d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148 13.98 13.98 0 0 0 11.82 8.292a4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z"
                            />
                          </svg>
                          Twitter
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"#"}
                          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"
                        >
                          <svg className="size-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <title>Discord</title>
                            <path
                              fill="currentColor"
                              d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
                            />
                          </svg>
                          Discord
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm text-neutral-500 mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} NaroBase. All rights reserved.
                  </p>
                  <div className="flex gap-6">
                    <Link
                      href={"#"}
                      className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href={"#"}
                      className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                    <Link
                      href={"#"}
                      className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      Cookie Policy
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
