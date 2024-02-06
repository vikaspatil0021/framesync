import { SideBarComponent } from "@/components/ui/db/sidebar/sideBar"

export default function RootLayout({
   children
}: {
   children: React.ReactNode
}) {

   return (
      <>
         <div className="bg-[#222] flex min-h-screen">
            <SideBarComponent />
            <div>
               {children}
            </div>
         </div>
      </>
   )
}
