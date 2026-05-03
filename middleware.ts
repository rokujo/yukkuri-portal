import { NextRequest, NextResponse } from "next/server";

const REALM = "Yukkuri Students Area";

function unauthorized(message = "Authentication required") {
  return new NextResponse(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function middleware(req: NextRequest) {
  const password = process.env.STUDENT_PASSWORD;

  if (!password) {
    return new NextResponse(
      "STUDENT_PASSWORD is not configured. Set it in your environment variables.",
      { status: 503 }
    );
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) {
    return unauthorized();
  }

  const expected = "Basic " + btoa(`student:${password}`);

  if (!timingSafeEqual(auth, expected)) {
    return unauthorized();
  }

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = {
  matcher: "/students/:path*",
};
