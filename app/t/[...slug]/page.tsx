"use client"
import { DashboardHeader } from "@/components/ui/dashboardHeader/dashboardHeader";
import ProjectContainer from "@/components/ui/projectContainer/projectContainer";

export default function Page({ params }: {
   params: {
      slug: [teamId: string, projectId: string]
   }
}) {
   const customParams = {
      teamId: params.slug[0] as string
   }

   const projectId = params.slug[1];
   return (
      <>
         <div>
            <DashboardHeader params={customParams} />
            {
               projectId ?
                  <div>
                     hi
                  </div>
                  :
                  <div>
                     <ProjectContainer params={customParams} />
                  </div>
            }
         </div>
      </>
   )
}
