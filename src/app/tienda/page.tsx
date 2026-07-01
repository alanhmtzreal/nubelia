import type { Metadata } from "next";
import TiendaGrid from "./TiendaGrid";

export const metadata: Metadata = {
  title: "Tienda | Nubelia",
};

export default function TiendaPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-dark/50">
          Nubelia
        </p>
        <h1 className="mt-2 font-display text-4xl text-dark">Tienda</h1>
        <p className="mx-auto mt-4 max-w-xl font-body text-dark/70">
          Turbos ambientadores, room spray, difusores y línea económica para
          tu hogar o negocio.
        </p>
      </div>
      <TiendaGrid />
    </div>
  );
}
