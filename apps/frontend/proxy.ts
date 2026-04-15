import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isValidLocale } from "@/lib/localization/i18n-config";

function getLocaleFromPathname(pathname: string): string | null {
  const segment = pathname.split("/")[1];
  return segment && isValidLocale(segment) ? segment : null;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // redirect to default locale
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  const locale = getLocaleFromPathname(pathname);

  if (locale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-next-locale", locale);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const newUrl = new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|locales|.*\\..*).*)"],
};
