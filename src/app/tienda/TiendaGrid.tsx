"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product, ProductCategory } from "@/types/product";

const CATEGORIES: { value: ProductCategory | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "turbo", label: "Turbos" },
  { value: "room-spray", label: "Room Spray" },
  { value: "difusor", label: "Difusores" },
  { value: "difusor-chico", label: "Difusores chico" },
  { value: "esencia", label: "Esencia para Difusor" },
  { value: "linea-economica", label: "Línea económica" },
];

export default function TiendaGrid({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<ProductCategory | "todos">(
    "todos"
  );

  const filtered = useMemo(
    () =>
      category === "todos"
        ? products
        : products.filter((p) => p.category === category),
    [category, products]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`border px-5 py-2 font-body text-xs uppercase tracking-widest transition ${
              category === c.value
                ? "border-dark bg-dark text-cream"
                : "border-dark/20 text-dark/70 hover:border-dark"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
