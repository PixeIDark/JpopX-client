import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const protectedPaths = ["/mylist", "/profile", "/add-list"];
  const isProtectedRoute = protectedPaths.includes(pathname);

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/account");

  if (isProtectedRoute && !token) {
    console.log("프로젝트 발동", token);
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  if (isAuthPage && token) {
    console.log("로그인 발동", token);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|icons).*)"],
};
