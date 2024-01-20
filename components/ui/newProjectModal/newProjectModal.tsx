import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../dialog"
import { Button } from "../button"
import { Input } from "../input"
import { ScrollArea } from "../scroll-area"
import { useState } from "react"
import { toast } from "../use-toast"
import { Plus } from "lucide-react"

export const NewProjectModal = ({
   params,
   getProjects
}: {
   params: {
      teamId: string
   },
   getProjects: () => void
}) => {

   const [open, setOpen] = useState(false);
   const [isLoading, setLoading] = useState(false);
   const [projectName, setProjectname] = useState('');

   const createProject = async () => {
      if (projectName === '') {
         toast({
            variant: "destructive",
            title: "Enter a valid Project Name.",
         });

         return;
      }
      setLoading(true);

      const result = await fetch('/api/project', {
         method: "POST",
         body: JSON.stringify({
            teamId: params.teamId,
            name: projectName
         })
      });

      setLoading(false);

      if (!result.ok) {
         const errorMsg = await result.json();
         toast({
            variant: "destructive",
            title: errorMsg.error,
         });
         return;
      }

      toast({
         variant: "success",
         title: projectName + " - Project Created"
      });

      getProjects();
      setProjectname('')
      setOpen(false);
   }
   return (
      <>
         <Dialog key={"newProjectModal"} open={open} onOpenChange={setOpen}>
            <DialogTrigger >
               <>
                  <Button variant='secondary'
                     size='lg'
                     className="hidden sm:block"
                  >
                     New Project
                  </Button>

                  <Button variant='secondary'
                     size='lg'
                     className="px-2 block sm:hidden"
                  >
                     <Plus className="h-5" />
                  </Button>
               </>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle className="text-sm">New Project</DialogTitle>
               </DialogHeader>

               <ScrollArea className="max-h-[40vh] flex">
                  <div className="py-3 ps-0.5 ">
                     <Input placeholder="Project Name"
                        value={projectName}
                        onChange={(e) => {
                           setProjectname(e.target.value)
                        }}
                     />
                  </div>
               </ScrollArea>

               <DialogFooter >
                  <Button
                     variant='secondary'
                     className="w-full"
                     loading={isLoading}
                     onClick={() => createProject()}
                  >
                     Create Project
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog >
      </>
   )
}
