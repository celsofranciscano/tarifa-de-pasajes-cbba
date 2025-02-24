import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const routePermissions = [
  { route: "/dashboard/settings/*", roles: ["Superadministrador"] },
  { route: "/dashboard/*", roles: ["Administrador", "Superadministrador"] }
];
// const routePermissions = [
//   { route: "/dashboard/settings/*", roles: ["Superadministrador"] },
//   { route: "/dashboard/*", roles: ["Administrador", "Superadministrador"] },
//   { route: "/api/dashboard/*", roles: ["Administrador", "Superadministrador"] },
//   { route: "/api/settings/*", roles: ["Superadministrador"] },
// ];

const convertToRegex = (route) =>
  new RegExp("^" + route.replace(/:[a-zA-Z0-9]+/g, "([^/]+)") + "(?:/.*)?$");

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const secret = process.env.AUTH_SECRET;

  // Determinar el nombre de la cookie según el entorno
  const cookieName = process.env.NODE_ENV === 'production' 
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';

  // Obtener el token de sesión
  const token = await getToken({ req, secret, cookieName });
  const isLoggedIn = !!token;

  // 1. Manejar rutas públicas (no protegidas)
  const isProtectedRoute = routePermissions.some(({ route }) => 
    convertToRegex(route).test(pathname)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // 2. Usuario no autenticado
  if (!isLoggedIn) {
    // Diferenciar entre rutas API y páginas
    if (pathname.startsWith("/api")) {
      return new NextResponse(
        JSON.stringify({ error: "Acceso no autorizado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 3. Verificar permisos de ruta
  for (const { route, roles } of routePermissions) {
    const routeRegex = convertToRegex(route);
    if (routeRegex.test(pathname) && !roles.includes(token.privilege)) {
      if (pathname.startsWith("/api")) {
        return new NextResponse(
          JSON.stringify({ error: "No tienes permisos" }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};