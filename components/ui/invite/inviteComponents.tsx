/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"

import { CheckMark, ClockIcon, LockIcon, Xmark } from "@/components/icons/Icons"

import { Button } from "../button"
import BuiltByMe from "../shared/builtByMe"

const ComponentCard = ({
    children,
}: {
    children: React.ReactNode,
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
                <div className="mb-3">
                    <div className="text-xl font-bold">
                        Invite accepted
                    </div>
                    <div className="text-lg">
                        Welcome to the team.
                    </div>
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

export const WrongAccountContent = () => {
    return (
        <>
            <ComponentCard>
                <div className="flex justify-center">
                    <Xmark />
                </div>
                <div className="mb-3">
                    <div className="text-xl font-bold">
                        Wrong email
                    </div>
                    <div className="text-lg">
                        This invite isn't for your email.
                    </div>
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

export const NotLoggedInContent = () => {
    return (
        <>
            <ComponentCard>
                <div className="flex justify-center">
                    <LockIcon />
                </div>
                <div className="mb-3">
                    <div className="text-xl font-bold">
                        Not logged in
                    </div>
                    <div className="text-lg">
                        Kindly authenticate before proceeding.
                    </div>
                </div>
                <Link href='/auth' className="w-full">
                    <Button variant='secondary' className="w-full">
                        Go to Auth
                    </Button>
                </Link>
            </ComponentCard>
        </>
    )
}


export const ExpiredContent = () => {
    return (
        <>
            <ComponentCard>
                <div className="flex justify-center">
                    <ClockIcon />
                </div>
                <div className="mb-3">
                    <div className="text-xl font-bold">
                        Token expired
                    </div>
                    <div className="text-lg">
                        Invites expire in 7 days <br /> Request a new one.
                    </div>
                </div>
            </ComponentCard>
        </>
    )
}

export const UsedContent = () => {
    return (
        <>
            <ComponentCard>
                <div className="flex justify-center">
                    <CheckMark />
                </div>
                <div className="mb-3">
                    <div className="text-xl font-bold">
                        Invite already accepted
                    </div>
                    <div className="text-lg">
                        You are already part of the team.
                    </div>
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