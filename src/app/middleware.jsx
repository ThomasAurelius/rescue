// middleware.js (to protect certain routes globally)
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
	const token = request.cookies.get("token")?.value;
	const { pathname } = request.nextUrl;

	// Define routes that require authentication (example: anything under /dashboard)
	if (pathname.startsWith("/dashboard")) {
		if (!token) {
			// Redirect to login if not logged in
			request.nextUrl.pathname = "/login";
			return NextResponse.redirect(request.nextUrl);
		}
		try {
			jwt.verify(token, process.env.JWT_SECRET);
			// If needed, we could attach user info to request headers here
		} catch (e) {
			// Token verification failed, redirect to login
			request.nextUrl.pathname = "/login";
			return NextResponse.redirect(request.nextUrl);
		}
	}
	// For other routes, or if authenticated, proceed normally
	return NextResponse.next();
}
