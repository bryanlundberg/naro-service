"use client"

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import React from "react";
import { useTheme } from "next-themes";

export default function Background() {
  const { resolvedTheme } = useTheme();

  return (
    <FlickeringGrid
      className="relative inset-0 z-0 mx-auto"
      squareSize={40}
      gridGap={6}
      maxOpacity={0.02}
      flickerChance={0.9}
      height={1080}
      width={1980}
      color={resolvedTheme === "light" ? "#000000" : "#ffffff"}
    />
  )
}
