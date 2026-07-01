import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | Nubelia",
};

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="font-body text-xs uppercase tracking-[0.3em] text-dark/50">
        Nubelia
      </p>
      <h1 className="mt-2 font-display text-4xl text-dark">Nosotros</h1>

      <div className="mt-8 flex flex-col gap-6 font-body text-dark/70">
        <p>
          En Nubelia creemos que el aroma es una de las formas más poderosas
          de crear recuerdos y emociones. Nacimos con la idea de acercar el
          marketing olfativo tanto a los hogares como a los negocios,
          ofreciendo productos de alta calidad y fórmulas de larga duración.
        </p>
        <p>
          Trabajamos con turbos ambientadores, room spray para textiles y
          difusores de aromatización, pensados para cubrir desde espacios
          pequeños hasta ambientes comerciales de mayor tamaño.
        </p>
        <p>
          Nuestro objetivo es simple: que cada espacio que trabajemos tenga
          una identidad olfativa propia, memorable y duradera.
        </p>
      </div>
    </div>
  );
}
