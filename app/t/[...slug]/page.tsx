"use client"
import { ManageMembersModal } from "@/components/ui/membersModal/membersModal";
import { DashboardHeader } from "@/components/ui/dashboardHeader/dashboardHeader";

export default function Page({ params }: {
  params: {
    slug: [teamId: string, projectId: string]
  }
}) {
  const customParams = {
    teamId: params.slug[0] as string
  }
  return (
    <>
      <div>

        <DashboardHeader params={customParams} />
        <div className="p-10 h-screen">
          <ManageMembersModal params={customParams} />
        </div>
      </div>
    </>
  )
}
