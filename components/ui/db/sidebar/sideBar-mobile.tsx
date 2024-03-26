"use client"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
 } from "@/components/ui/sheet"
 import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SideBarComponent } from "./sideBar";

export default function SideBarMobileComponent() {


    return (
        <>
            <Sheet>
                <SheetTrigger className="lg:hidden">
                    <HamburgerMenuIcon className="text-[#fff] text-lg w-6 h-8 absolute top-0 left-0 m-5" />
                </SheetTrigger>
                <SheetContent onOpenAutoFocus={(e) => e.preventDefault()} side='left' className="p-0 w-[300px] bg-[#2c2c2c]">
                    <SideBarComponent />
                </SheetContent>
            </Sheet>
        </>
    )
}