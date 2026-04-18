import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  //  Pages publiques (pas protégées)
  const publicPaths = ["/auth/login", "/auth/register"];
  const isPublicPath = publicPaths.includes(pathname);

  //  Si pas de token et page protégée → redirect login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  //  Si connecté et essaie d'aller sur auth → redirect home
  if (token && isPublicPath) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};