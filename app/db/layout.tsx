import { SideBarComponent } from "@/components/ui/db/sidebar/sideBar"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode,
}) {

   const session = await getServerSession();
   if (!session) redirect('/auth');

   return (
      <>
         <div className="bg-[#222] flex min-h-screen">
            <div className="hidden lg:block">
               <SideBarComponent />
            </div>

            <Sheet>
               <SheetTrigger className="lg:hidden">
                  <HamburgerMenuIcon className="text-[#fff] text-lg w-6 h-8 absolute top-0 left-0 m-5" />
               </SheetTrigger>
               <SheetContent side='left' className="p-0 w-[300px] bg-[#2c2c2c]">
                  <SideBarComponent />
               </SheetContent>
            </Sheet>
            
            {children}
         </div>
      </>
   )
}
