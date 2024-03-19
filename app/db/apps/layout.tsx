import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Apps | Framesync.in',
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}