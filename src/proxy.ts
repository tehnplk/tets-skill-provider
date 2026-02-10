import { auth } from "@/authConfig";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // หน้าที่ไม่ต้อง login (public routes)
  const publicRoutes = ["/", "/about"];
  const isPublicRoute = publicRoutes.includes(pathname);

  // ถ้าไม่ public และยังไม่ login → redirect ไป /
  if (!isPublicRoute && !isLoggedIn) {
    const loginUrl = new URL("/", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
