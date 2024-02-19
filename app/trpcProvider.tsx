"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

import { trpc } from "@/trpc/client/trpcClient";

export const TRPCProvider = ({ children }: { children: React.ReactNode }) => {

  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: `/api/trpc`
        })
      ]
    })
  })

  return (
    <>
      <trpc.Provider queryClient={queryClient} client={trpcClient}>
        <QueryClientProvider client={queryClient}>

          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </>
  )
}

