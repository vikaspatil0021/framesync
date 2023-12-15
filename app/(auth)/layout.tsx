"use client"
import { SessionProvider } from "next-auth/react"

import BuiltByMe from "@/components/ui/shared/builtByMe"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            <div className="bg-[#111] text-[#d3d1d1] flex min-h-screen flex-col items-center justify-center p-5 md:p-24">
                {children}
                <BuiltByMe />
            </div>
        </SessionProvider>
    )
}
