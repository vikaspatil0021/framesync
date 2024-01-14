"use client"
import { DashboardHeader } from "@/components/ui/dashboardHeader/dashboardHeader";
import { Input } from "@/components/ui/input";
import { NewProjectModal } from "@/components/ui/newProjectModal/newProjectModal";
import ProjectContainer from "@/components/ui/projectContainer/projectContainer";
import { Search } from "lucide-react";

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

            <div>
               <ProjectContainer params={customParams} />
            </div>
         </div>
      </>
   )
}
