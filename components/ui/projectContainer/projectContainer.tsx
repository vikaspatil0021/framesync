import { AngleRight } from "@/components/icons/Icons"
import { toast } from "../use-toast"
import { useEffect, useState } from "react"

const ProjectCard = () => {
   return (
      <>
         <div className="relative group bg-[#191919] hover:bg-[#222] border border-white/10 hover:border-white/50 cursor-pointer transition-all rounded-lg min-w-[300px] min-h-[200px] p-5 ">
            <div className="flex flex-col">
               <span>
                  Java series
               </span>
               <div className="text-sm opacity-50 mt-2">
                  2 item | 273 kb
               </div>

            </div>

            <div className="hidden group-hover:block transition-all absolute right-4 top-4">
               <AngleRight />
            </div>
         </div>
      </>
   )
}


export default function ProjectContainer({
   params
}: {
   params: { teamId: string }
}) {

   const [projects, setProjects] = useState([]);
   const getProjects = async () => {

      const result = await fetch(`/api/project?teamId=${params?.teamId}`, {
         method: "GET"
      })
      if (!result.ok) {
         const errorMsg = await result.json();
         toast({
            variant: "destructive",
            title: errorMsg.error,
         });
         return;
      }

      const data = await result.json();
      setProjects(data.projects)
   }

   useEffect(() => {
      if (projects.length === 0) {

         getProjects()
      }
   }, [])
   return (
      <>
         <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-4">
            {
               projects.length !== 0 && projects.map((each) => {
                  return (
                     <>

                        <ProjectCard />
                     </>
                  )
               })
            }

         </div>

      </>

   )
}
