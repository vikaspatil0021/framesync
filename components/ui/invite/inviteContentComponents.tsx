/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"

import { CheckMark, ClockIcon, LockIcon, NotFound, Xmark } from "@/components/icons/Icons"

import { Button } from "../button"
import BuiltByMe from "../common/builtByMe"
import { Skeleton } from "../skeleton"

const ComponentCard = ({
   children,
}: {
   children: React.ReactNode,
}) => {
   return (
      <>
         <div className="bg-[#222] text-[#fff] flex h-screen flex-col items-center justify-center p-5">
            <div className="font-semibold text-4xl py-3 mb-5">
               Framesync.in
            </div>
            <div className="flex flex-col w-full gap-3 p-7 bg-[#333] max-w-md min-w-fit rounded-md border border-white/10 mb-5 text-center">
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
               <div className="text-lg text-gray-400">
                  Welcome to the team. <br />🎉🎉🎉
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
               <div className="text-lg text-gray-400">
                  This invite isn't for <br /> your email.
               </div>
            </div>
            <Link href='/' className="w-full">
               <Button variant='secondary' className="w-full">
                  Go back to app
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
               <div className="text-lg text-gray-400">
                  Kindly authenticate <br /> before proceeding.
               </div>
            </div>
            <Link href='/auth' className="w-full">
               <Button variant='secondary' className="w-full">
                  Authenticate
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
               <div className="text-lg text-gray-400">
                  Invites expires in 7 days <br /> Request a new one.
               </div>
            </div>
            <Link href='/' className="w-full">
               <Button variant='secondary' className="w-full">
                  Go back to app
               </Button>
            </Link>
         </ComponentCard>
      </>
   )
}

export const NoTokenContent = () => {
   return (
      <>
         <ComponentCard>
            <div className="flex justify-center">
               <NotFound />
            </div>
            <div className="mb-3">
               <div className="text-xl font-bold">
                  No Token Found
               </div>
               <div className="text-lg text-gray-400">
                  Please ensure you have <br /> valid invite link.
               </div>
            </div>
            <Link href='/' className="w-full">
               <Button variant='secondary' className="w-full">
                  Go back to app
               </Button>
            </Link>
         </ComponentCard>
      </>
   )
}


export const LoadingContent = () => {
   return (
      <>
         <ComponentCard>
            <div className="flex justify-center">
               <Skeleton className="h-12 w-12 rounded-full bg-white/75" />
            </div>
            <div className="mb-3">
               <div className="text-xl font-bold">
                  <Skeleton className="h-6 w-1/2 mx-auto bg-zinc-700" />
               </div>
               <div className="text-lg">
                  <Skeleton className="h-3 w-3/4 mx-auto my-3 bg-zinc-700" />
                  <Skeleton className="h-3 w-1/2 mx-auto my-3 bg-zinc-700" />
               </div>
            </div>
            <Skeleton className="h-9 bg-white/70" />
         </ComponentCard>
      </>
   )
}
