import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import BuiltByMe from "@/components/ui/shared/builtByMe"

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession();

    //redirect if authenticated
    if (session) redirect('/');

    return (
        <>
            <div className="bg-[#111] text-[#d3d1d1] flex h-screen flex-col items-center justify-center p-5">
                {children}
                <BuiltByMe />
            </div>
        </>
    )
}
