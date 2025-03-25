"use client";

import React from "react";
import { useAOS } from "@/hooks/useAOS";
import { useIOS } from "@/hooks/useIOS";
import { useScrollPosition } from "@/hooks/useScrollPosition";

function Main({ children }: { children: React.ReactNode }) {
  const { scrollRef, hasScrollbar } = useScrollPosition();
  const isAOS = useAOS();
  const isIOS = useIOS();

  const overflowClass = isAOS ? "overflow-touch overflow-y-auto" : "overflow-y-auto";
  const paddingClass = hasScrollbar ? "pr-3 pl-4 " : "pr-4 pl-4 ";
  const blackClass = isIOS ? "h-[170px] w-full" : "h-[77px] w-full";

  return (
    <main ref={scrollRef} className={`h-full ${overflowClass} ${paddingClass}`}>
      {children}
      <div className={blackClass} />
    </main>
  );
}

export default Main;
