import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function adminAuthMiddleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_URL });
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/admin')) {
        if (!token || token.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}