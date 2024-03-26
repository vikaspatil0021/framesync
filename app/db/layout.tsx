
import { SideBarComponent } from "@/components/ui/db/sidebar/sideBar"
import SideBarMobileComponent from "@/components/ui/db/sidebar/sideBar-mobile";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";



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
            <SideBarMobileComponent />

            

            {children}
         </div>
      </>
   )
}
