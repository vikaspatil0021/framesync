import { AngleRight } from "@/components/icons/Icons"
import { toast } from "../use-toast"
import { useEffect, useState } from "react"
import Link from "next/link";
import { Skeleton } from "../skeleton";
import { Search, SearchIcon } from "lucide-react";
import { Input } from "../input";
import { NewProjectModal } from "../newProjectModal/newProjectModal";
import { ScrollArea } from "../scroll-area";


type EachProject = {
   id: string;
   name: string;
   teamId: string
}
const ProjectCard = ({ eachProject }: { eachProject: EachProject }) => {
   return (
      <>
         <Link href={'/t/' + eachProject.teamId + '/' + eachProject.id}>
            <div className="relative group bg-[#191919] hover:bg-[#222] border border-white/10 hover:border-white/50 cursor-pointer transition-all rounded-lg min-w-[300px] min-h-[200px] p-5 ">
               <div className="flex flex-col">
                  <span>
                     {eachProject.name}
                  </span>
                  <div className="text-sm opacity-50 mt-2">
                     2 item | 273 kb
                  </div>

               </div>

               <div className="hidden group-hover:block transition-all absolute right-4 top-4">
                  <AngleRight />
               </div>
            </div>
         </Link >
      </>
   )
}

const ProjectsCardSkeleton = () => {
   return (
      <>
         <div className="bg-[#191919] border border-white/10 rounded-lg min-w-[300px] min-h-[200px] p-5 ">
            <Skeleton className="h-4 w-[200px] bg-[#555] mt-1" />
            <Skeleton className="h-3 w-[150px] mt-3 bg-[#333]" />
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
   const [filterProjects, setFilterProjects] = useState([]);

   const [noProjectStatus, setNoProjectStatus] = useState(false);
   const [searchValue, setSearchValue] = useState('')


   useEffect(() => {
      if (searchValue === '') {
         setNoProjectStatus(false);
         setFilterProjects(projects);
      } else {
         const filterData = projects.filter((each: EachProject) => {
            if (each?.name.toLowerCase().includes(searchValue)) return each;
         });
         if (filterData.length === 0) {
            setNoProjectStatus(true)
         }
         setFilterProjects(filterData);
      }


   }, [searchValue])


   const getProjects = async () => {

      setProjects([])
      setNoProjectStatus(false)

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

      if (data.projects.length === 0) {
         setNoProjectStatus(true);
         return
      }

      setProjects(data.projects);
      setFilterProjects(data.projects)
      setNoProjectStatus(false)
   }

   useEffect(() => {
      if (projects.length === 0) {

         getProjects()
      }
   }, [])

   return (
      <>
         <div className="flex justify-center py-6">
            <div className="max-w-[1400px] w-full flex gap-4">
               <div className="relative flex items-center w-full">
                  <Search className="absolute left-0 h-4 w-4 mx-3 text-gray-400/70" />
                  <Input className="w-full border border-white/20 bg-[#191919] py-5 ps-10 text-[16px] focus-visible:ring-white/20"
                     placeholder="Search Projects..."
                     value={searchValue}
                     onChange={(e) => setSearchValue(e.target.value)}
                  />
               </div>
               <div>
                  <NewProjectModal
                     params={params}
                     getProjects={getProjects}
                  />
               </div>
            </div>
         </div>

         {
            noProjectStatus ?
               <>
                  <div className="flex flex-col items-center justify-center text-[#777] py-20 gap-4"    >
                     <SearchIcon />
                     No Projects Found
                  </div>
               </>
               :
               <ScrollArea className="h-[75vh] max-w-[1430px] mx-auto ">
                  <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-4">

                     {
                        projects.length !== 0 ?
                           filterProjects.map((eachProject: EachProject) => {
                              return (
                                 <>

                                    <ProjectCard
                                       key={eachProject.id}
                                       eachProject={eachProject}
                                    />
                                 </>
                              )
                           })
                           :
                           <>
                              <ProjectsCardSkeleton />
                              <ProjectsCardSkeleton />
                              <ProjectsCardSkeleton />
                              <ProjectsCardSkeleton />
                              <ProjectsCardSkeleton />
                           </>
                     }

                  </div>
               </ScrollArea>
         }
      </>

   )
}
