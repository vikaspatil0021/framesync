import { AngleDown } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hook";
import { updateOrder } from "@/lib/redux-toolkit/slices/mediaOrderOptions";
import { Check } from "lucide-react";
import { useEffect, useState } from "react"

export default function SortOptions() {

    const dispatch = useAppDispatch();

    const order = ["Asc", "Desc"]
    const sortingOption = ['Date uploaded', 'Name', 'Size'];


    const { orderBy } = useAppSelector((state) => state.mediaOrderOptions);
    let key;

    if (Object.keys(orderBy)[0] === 'uploaded_at') {
        key = sortingOption[0];
    } else {
        key = Object.keys(orderBy)[0].slice(0, 1).toLocaleUpperCase() + Object.keys(orderBy)[0].slice(1);
    }

    const value = Object.values(orderBy)[0].slice(0, 1).toLocaleUpperCase() + Object.values(orderBy)[0].slice(1);

    const [orderValue, setOrderValue] = useState<string>(value || order[0]);
    const [sortValue, setSortValue] = useState<string>(key || sortingOption[0]);

    const [openStatus, setOpenStatus] = useState<boolean>(false);


    useEffect(() => {
        const data = {} as any;
        if (sortValue === 'Date uploaded') {
            data['uploaded_at'] = orderValue.toLocaleLowerCase()
        } else {
            data[sortValue.toLocaleLowerCase()] = orderValue.toLocaleLowerCase();
        }

        dispatch(updateOrder(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortValue, orderValue]);

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