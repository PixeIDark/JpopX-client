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
import { getTheme } from "@/utils/theme";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JpopX",
  icons: { icon: "@/app/favicon.ico" },
  description: "search j-pop number",
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const theme = await getTheme();

  return (
    <html lang="ko" data-theme={theme} suppressHydrationWarning>
      <body className={`${manrope.variable} antialiasing`}>
        <SessionProvider session={session}>
          <QueryProvider>
            <ScrollPositionProvider>
              <ThemeProvider initialTheme={theme}>
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
