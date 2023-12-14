import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-[#111] text-[#d3d1d1] flex min-h-screen flex-col items-center justify-center p-5 md:p-24">
            {children}
            <div className="text-sm pt-2 mb-20">
                Built by
                <Button variant='link' className="px-1">
                    <Link href='https://github.com/vikaspatil0021'>
                        vikaspatil0021
                    </Link>
                </Button>
            </div>
        </div>
    )
}
