"use client";

import { SessionProvider } from "next-auth/react";

export const SessionClientProvider = ({children}: {children: React.ReactNode}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}