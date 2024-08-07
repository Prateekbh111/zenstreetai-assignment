import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

//middleware to not let unverified user to access authorized page
export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	const url = request.nextUrl;
	if (token) {
		if (
			url.pathname.startsWith("/sign-in") ||
			url.pathname.startsWith("/sign-up")
		) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}
	if (!token && url.pathname === "/") {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/sign-in", "/sign-up", "/"],
};
