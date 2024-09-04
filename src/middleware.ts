import { NextRequest } from "next/server";
import { adminAuthMiddleware } from "./middleware/adminAuthMiddleware";

export function middleware(req: NextRequest) {
    return adminAuthMiddleware(req);
}

export const config = {
    matcher: ['/admin/:path*'],
};