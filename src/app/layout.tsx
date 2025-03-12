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
import Main from "@/app/_layout/Main";
import { ThemeProvider } from "@/app/_providers/ThemeProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JpopX",
  icons: { icon: "/favicon.ico" },
  description: "search j-pop number",
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiasing`}>
        <SessionProvider session={session}>
          <QueryProvider>
            <ScrollPositionProvider>
              <ThemeProvider>
                <div className="mx-auto flex h-screen max-w-lg flex-col">
                  <ToastProvider maxToasts={5}>
                    <TopNav />
                    <Main>{children}</Main>
                    <BottomNav />
                  </ToastProvider>
                </div>
              </ThemeProvider>
            </ScrollPositionProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;
