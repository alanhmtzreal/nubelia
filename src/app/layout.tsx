import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nubelia | Marketing Olfativo",
  description:
    "Nubelia — aromatización de espacios, difusores, room spray y turbos ambientadores para hogar y negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${jost.variable} font-body bg-cream text-dark antialiased`}
      >
        <CartProvider>
          <SiteChrome>{children}</SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}
