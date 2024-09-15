import { NextRequest } from "next/server";
import { adminAuthMiddleware } from "./middleware/adminAuth";

export function middleware(req: NextRequest) {
    return adminAuthMiddleware(req);
}

export const config = {
    matcher: ['/admin/:path*'],
};