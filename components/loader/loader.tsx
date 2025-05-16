"use client"

import { HashLoader } from "react-spinners";
import { useTheme } from "next-themes";

export default function Loader() {
  const { theme, resolvedTheme } = useTheme();
  const themeResolve = resolvedTheme === "dark" ? "white" : "black";
  return (
    <div className={"flex justify-center items-center h-96"}>
      <HashLoader color={themeResolve}/>
    </div>
  )
}
