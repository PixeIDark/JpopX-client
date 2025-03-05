import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "@/app/_providers/SessionProvider";
import QueryProvider from "@/app/_providers/QueryProvider";
import TopNav from "@/app/_layout/TopNav";
import BottomNav from "@/app/_layout/BottomNav";
import { authOptions } from "@/lib/next-auth/nextAuth";
import ToastProvider from "@/components/ui/Toast/ToastContext";
import { ScrollPositionProvider } from "@/app/_providers/ScrollPositionProvider";
import { getTheme } from "@/utils/theme";
import Main from "@/app/_layout/Main";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "App",
  description: "Generated by create next app",
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko" data-theme={theme} suppressHydrationWarning>
      <body className={`${manrope.variable} antialiasing`}>
        <SessionProvider session={session}>
          <QueryProvider>
            <ToastProvider maxToasts={5}>
              <ScrollPositionProvider>
                <div className="flex h-screen flex-col">
                  <TopNav currentTheme={theme} />
                  <Main>{children}</Main>
                  <BottomNav />
                </div>
              </ScrollPositionProvider>
            </ToastProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
