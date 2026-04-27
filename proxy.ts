import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "cleanstart.com";

export function proxy(request: NextRequest): NextResponse {
  const host =
    request.headers.get("host")?.split(":")[0].toLowerCase() ?? "";
  const response = NextResponse.next();

  if (host !== CANONICAL_HOST) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
