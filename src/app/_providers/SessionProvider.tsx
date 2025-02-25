"use client";

import React from "react";
import { SessionProvider as Provider } from "next-auth/react";

interface SessionProviderProps {
  children: React.ReactNode;
  session: any;
}

function SessionProvider({ children, session }: SessionProviderProps) {
  return <Provider session={session}>{children}</Provider>;
}

export default SessionProvider;
