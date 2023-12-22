"use client"

import BuiltByMe from "@/components/ui/shared/builtByMe"
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = useSession();
    const searchParams = useSearchParams();

    // handle oauth errors with toast
    const error: string | null = searchParams.get('error');
    if (session?.status === 'unauthenticated' && error) {
        toast({
            variant: "destructive",
            title: error,
            description: 'Please try again later!'
        });
    }

    //redirect if authenticated
    if (session?.status === 'authenticated') redirect('/');

    return (
        <>
            <div className="bg-[#111] text-[#d3d1d1] flex h-screen flex-col items-center justify-center p-5">
                {children}
                <BuiltByMe />
            </div>
        </>
    )
}
