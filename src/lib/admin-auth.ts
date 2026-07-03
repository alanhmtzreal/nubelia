import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "nubelia_admin_session";

export function isAdminAuthenticated(): boolean {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  return !!session && session === process.env.ADMIN_PASSWORD;
}
