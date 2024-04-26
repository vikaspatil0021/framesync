import { AngleDown } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { useState } from "react"

export default function SortOptions() {
    const order = ["Asc", "Desc"]
    const sortingOption = ['Date uploaded', 'Name', 'Size'];

    const [sortValue, setSortValue] = useState<string>(sortingOption[0]);
    const [orderValue, setOrderValue] = useState<string>(order[0]);

    const [openStatus, setOpenStatus] = useState<boolean>(false);

    return (
        <>
            <DropdownMenu open={openStatus} onOpenChange={setOpenStatus}>
                <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer flex gap-1 font-bold items-center text-[11px] text-[#cbcbcb]">
                        {sortValue}
                        <AngleDown />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-white rounded-sm p-1 w-[150px] text-[12px] bg-[#2c2c2c]">
                    <div className="ps-1 text-[10px] py-1 font-semibold text-white/50">Order</div>
                    {
                        order?.map((eachOption: string) => {
                            return (
                                <>
                                    <div className={`${eachOption === orderValue && 'font-bold'} relative ps-3 pe-1 py-1 text-[11px] rounded-sm hover:bg-[#4c4c4c] flex items-center justify-between gap-2 cursor-pointer`} onClick={() => {
                                        setOrderValue(eachOption)
                                        setOpenStatus(false);
                                    }}>
                                        <span>
                                            {eachOption}
                                        </span>
                                        {eachOption === orderValue && <Check className="h-3" />}
                                    </div >
                                </>
                            )
                        })
                    }
                    <div className="ps-1 text-[10px] py-1 font-semibold text-white/50">Sort by</div>
                    {
                        sortingOption?.map((eachOption: string) => {
                            return (
                                <>
                                    <div className={`${eachOption === sortValue && 'font-bold'} relative ps-3 pe-1 py-1 text-[11px] rounded-sm hover:bg-[#4c4c4c] flex items-center justify-between gap-2 cursor-pointer`} onClick={() => {
                                        setSortValue(eachOption)
                                        setOpenStatus(false);
                                    }}>
                                        <span>
                                            {eachOption}
                                        </span>
                                        {eachOption === sortValue && <Check className="h-3" />}
                                    </div >
                                </>
                            )
                        })
                    }
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}