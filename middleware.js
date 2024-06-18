import { NextResponse } from "next/server";
import verifyAuth from "./lib/verifyAuth"; // Your custom auth verification logic

export async function middleware(req) {
  //   const token = req.cookies.get("token")?.value;
  const token = "asdasd";

  const isAuthenticated = verifyAuth(token);

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Specify the paths that the middleware should run on
export const config = {
  matcher: ["/counter"], // Add more protected paths as needed
};
