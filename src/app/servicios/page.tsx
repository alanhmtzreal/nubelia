import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servicios | Nubelia",
};

const SERVICIOS = [
  {
    title: "Aromatización de espacios",
    description:
      "Instalación y mantenimiento de difusores para aromatizar de forma constante hogares, oficinas y locales comerciales.",
  },
  {
    title: "Productos para uso personal",
    description:
      "Turbos ambientadores y room spray listos para usar en casa, auto o cualquier espacio que quieras perfumar.",
  },
  {
    title: "Marketing olfativo para negocios",
    description:
      "Desarrollamos una identidad olfativa para tu marca: el aroma que tus clientes asociarán con tu negocio.",
  },
  {
    title: "Venta por mayoreo",
    description:
      "Precios preferenciales para negocios que buscan surtir su tienda o mantener sus espacios siempre perfumados.",
  },
];

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-body text-xs uppercase tracking-[0.3em] text-dark/50">
        Nubelia
      </p>
      <h1 className="mt-2 font-display text-4xl text-dark">Servicios</h1>
      <p className="mt-4 max-w-2xl font-body text-dark/70">
        Además de nuestra tienda en línea, ofrecemos servicios de
        aromatización pensados para acompañar a tu hogar o tu negocio.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {SERVICIOS.map((s) => (
          <div key={s.title} className="border border-dark/10 p-6">
            <h3 className="font-display text-lg text-dark">{s.title}</h3>
            <p className="mt-3 font-body text-sm text-dark/70">
              {s.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/contacto"
          className="bg-dark px-8 py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90"
        >
          Contáctanos
        </Link>
      </div>
    </div>
  );
}
