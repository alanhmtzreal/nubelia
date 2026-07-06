import { MercadoPagoConfig } from "mercadopago";

export function getMercadoPagoClient() {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) return null;
  return new MercadoPagoConfig({ accessToken });
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function isSandboxMode() {
  return process.env.MERCADOPAGO_MODE?.trim().toLowerCase() !== "production";
}
