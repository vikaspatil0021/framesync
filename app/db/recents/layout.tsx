import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Recents | Framesync.in',
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