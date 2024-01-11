"use client"
import { DashboardHeader } from "@/components/ui/dashboardHeader/dashboardHeader";
import { DashboardControlsContainer } from "@/components/ui/dashboardControls/dashboardControlsContainer";

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

            <DashboardControlsContainer />
         </div>
      </>
   )
}
