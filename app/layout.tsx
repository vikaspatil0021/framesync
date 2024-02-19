"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from '@/components/ui/toaster'
import { TRPCProvider } from './trpcProvider'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <>
         <html lang="en">
            <body className={inter.className}>
               <TRPCProvider>
                  <SessionProvider>
                     {children}
                     <Toaster />
                  </SessionProvider>
               </TRPCProvider>
            </body>
         </html>
      </>
   )
}
