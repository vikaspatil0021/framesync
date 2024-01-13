import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../dialog"
import { Button } from "../button"
import { Input } from "../input"
import { ScrollArea } from "../scroll-area"
import { useState } from "react"
import { toast } from "../use-toast"

export const NewProjectModal = ({
   params
}: {
   params: {
      teamId: string
   }
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

      setProjectname('')
      setOpen(false);
   }
   return (
      <>
         <Dialog key={"newProjectModal"} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
               <Button variant='secondary' size='lg'
                  className="text-[16px]"
               >
                  New Project
               </Button>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>New Project</DialogTitle>
               </DialogHeader>

               <ScrollArea className="max-h-[40vh] flex">
                  <div className="py-3 ps-1 pe-3 ">
                     <Input placeholder="Project Name"
                        value={projectName}
                        onChange={(e) => {
                           setProjectname(e.target.value)
                        }}
                     />
                  </div>
               </ScrollArea>

               <DialogFooter className="1m:justify-start">
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
