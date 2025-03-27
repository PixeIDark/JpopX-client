"use client";

import React from "react";
import { SessionProvider as Provider } from "next-auth/react";

interface SessionProviderProps {
  children: React.ReactNode;
}

function SessionProvider({ children }: SessionProviderProps) {
  return <Provider>{children}</Provider>;
}

export default SessionProvider;
