import {NextResponse} from "next/server";

const PRIMARY_HOST = "zaranikahservice.online";
const PRIMARY_ORIGIN = `https://${PRIMARY_HOST}`;

export function middleware(request) {
  const hostname = request.nextUrl.hostname.toLowerCase();

  // Keep one public website address: https://zaranikahservice.online
  if (hostname === `www.${PRIMARY_HOST}`) {
    const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, PRIMARY_ORIGIN);
    return NextResponse.redirect(destination, 308);
  }

  const response = NextResponse.next();
  const canonicalUrl = new URL(request.nextUrl.pathname, PRIMARY_ORIGIN);
  response.headers.set("Link", `<${canonicalUrl.toString()}>; rel="canonical"`);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
