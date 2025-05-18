"use client";

import DatabaseMonitoring from "@/components/database-monitoring/database-monitoring";
import { useParams } from "next/navigation";

export default function Page() {
  const { projectId } = useParams();
  return (
    <DatabaseMonitoring projectId={projectId as string}/>
  )
}
