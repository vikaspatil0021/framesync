import { Search } from "lucide-react"
import { Input } from "../input"
import { Button } from "../button"

export const DashboardControlsContainer = () => {
   return (
      <>
         <div className="flex justify-center py-6">
            <div className="max-w-[1400px] w-full flex gap-4">
               <div className="relative flex items-center w-full">
                  <Search className="absolute left-0 h-4 w-4 mx-3 text-gray-400/70" />
                  <Input className="w-full border border-white/20 bg-[#191919] py-5 ps-10 text-[16px] focus-visible:ring-white/20" placeholder="Search Projects..." />
               </div>
               <div>
                  <Button variant='secondary' size='lg'
                     className="text-[16px]"
                  >
                     New Project
                  </Button>
               </div>
            </div>
         </div>
      </>
   )
}

