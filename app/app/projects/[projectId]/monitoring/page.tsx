import DatabaseMonitoring from "@/components/database-monitoring/database-monitoring";

export default async function Page({ params }: { params: { projectId: string } }) {
  const { projectId } = await params;
  return (
    <DatabaseMonitoring projectId={projectId as string}/>
  )
}
