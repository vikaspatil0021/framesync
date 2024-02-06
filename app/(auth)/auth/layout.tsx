import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import { Metadata } from "next";

import BuiltByMe from "@/components/ui/common/builtByMe";

export const metadata: Metadata = {
   title: "Auth | Framesync.in",
}

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   const session = await getServerSession();

   if (session) redirect('/');

   return (
      <>
         <div className="bg-[#222] text-[#fff] flex h-screen flex-col items-center justify-center p-5">
            {children}
            <BuiltByMe />
         </div>
      </>
   )
}
