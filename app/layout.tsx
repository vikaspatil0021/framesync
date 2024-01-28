"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from 'next-auth/react'

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
               <SessionProvider>
                  {children}
                  <Toaster />
               </SessionProvider>
            </body>
         </html>
      </>
   )
}
