"use client"

import { Inter } from 'next/font/google'
import './globals.css'

import { SessionProvider } from 'next-auth/react'
import { TRPCProvider } from './trpcProvider'

import { Toaster } from '@/components/ui/toaster';
import StoreProvider from './storeProvider'


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
               <StoreProvider>
                  <TRPCProvider>
                     <SessionProvider>
                        {children}
                        <Toaster />
                     </SessionProvider>
                  </TRPCProvider>
               </StoreProvider>
            </body>
         </html>
      </>
   )
}
