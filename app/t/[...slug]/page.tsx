"use client"
import { DashboardHeader } from "@/components/ui/dashboardHeader/dashboardHeader";
import { Input } from "@/components/ui/input";
import { NewProjectModal } from "@/components/ui/newProjectModal/newProjectModal";
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

            <div className="flex justify-center py-6">
               <div className="max-w-[1400px] w-full flex gap-4">
                  <div className="relative flex items-center w-full">
                     <Search className="absolute left-0 h-4 w-4 mx-3 text-gray-400/70" />
                     <Input className="w-full border border-white/20 bg-[#191919] py-5 ps-10 text-[16px] focus-visible:ring-white/20" placeholder="Search Projects..." />
                  </div>
                  <div>
                     <NewProjectModal params={customParams} />
                  </div>
               </div>
            </div>

         </div>
      </>
   )
}
