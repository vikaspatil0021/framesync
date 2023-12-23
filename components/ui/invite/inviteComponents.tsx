import Link from "next/link"

import { CheckMark } from "@/components/icons/Icons"

import { Button } from "../button"
import BuiltByMe from "../shared/builtByMe"

const ComponentCard = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <div className="flex h-screen flex-col items-center justify-center p-5">
                <div className="font-semibold text-4xl py-3 mb-5">
                    Framesync.in
                </div>
                <div className="flex flex-col w-full gap-3 p-7 bg-[#222] max-w-md min-w-fit rounded-md border border-white/5 mb-5 text-center">
                    {children}
                </div>
                <BuiltByMe />

            </div>
        </>
    )
}

export const RightAccountContent = () => {
    return (
        <>
            <ComponentCard>
                <div className="flex justify-center">
                    <CheckMark />
                </div>
                <div className="text-xl font-bold">
                    Invite accepted
                </div>
                <div className="text-lg">
                    Welcome to the team.
                </div>

                <Link href='/' className="w-full">
                    <Button variant='secondary' className="w-full">
                        Go to app
                    </Button>
                </Link>
            </ComponentCard>
        </>
    )
}