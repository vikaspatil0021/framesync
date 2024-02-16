
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export const TeamsSelectOption = () => {
   const [selectValue, setSelectValue] = useState('banana');
   return (
      <>
         <Select defaultValue="banana" onValueChange={setSelectValue}>
            <SelectTrigger className="flex-auto w-[180px] bg-[#3c3c3c] text-white border-none focus:ring-offset-0 focus:ring-0">
               <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent className="bg-[#222] text-white border-white/10 ">
               <SelectGroup>
                  <SelectItem value="apple">
                     <div className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-400" />
                        <span className="text-[12px] text-center m-auto">Vikas&#39;s Team</span>
                     </div>
                  </SelectItem>
                  <SelectItem value="banana">
                     <div className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-400" />
                        <span className="text-[12px] text-center m-auto">A2&#39;s Team</span>
                     </div>
                  </SelectItem>
                  <SelectItem value="blueberry">
                     <div className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-400" />
                        <span className="text-[12px] text-center m-auto">Portfoilio&#39;s Team</span>
                     </div>
                  </SelectItem>
                  <SelectItem value="apple1">
                     <div className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-400" />
                        <span className="text-[12px] text-center m-auto">Vikas&#39;s Team</span>
                     </div>
                  </SelectItem>
                  <SelectItem value="banana2">
                     <div className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-400" />
                        <span className="text-[12px] text-center m-auto">A2&#39;s Team</span>
                     </div>
                  </SelectItem>
                  <SelectItem value="blueberry3">
                     <div className="flex gap-2">
                        <div className="h-5 w-5 rounded-full bg-green-400" />
                        <span className="text-[12px] text-center m-auto">Portfoilio&#39;s Team</span>
                     </div>
                  </SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>
      </>
   )
}
