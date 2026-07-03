"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function ProductPurchaseBox({ product }: { product: Product }) {
  const [aroma, setAroma] = useState(product.aromas?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(product, quantity, aroma);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-8">
      <span className="font-display text-2xl text-dark">
        {formatPrice(product.price)}
      </span>

      {product.aromas && (
        <div className="mt-6">
          <label className="mb-2 block font-body text-xs uppercase tracking-widest text-dark/60">
            Aroma
          </label>
          <select
            value={aroma}
            onChange={(e) => setAroma(e.target.value)}
            className="w-full border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
          >
            {product.aromas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center border border-dark/20">
          <button
            className="px-3 py-2 text-dark/70 hover:text-dark"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="px-4 text-sm">{quantity}</span>
          <button
            className="px-3 py-2 text-dark/70 hover:text-dark"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={product.price === null}
          className="flex-1 bg-dark py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {product.price === null
            ? "Consultar disponibilidad"
            : added
            ? "Agregado ✓"
            : "Añadir al carrito"}
        </button>
      </div>

      {product.price === null && (
        <p className="mt-3 font-body text-xs text-dark/50">
          Este producto no tiene precio en línea todavía. Contáctanos por
          WhatsApp para cotizarlo.
        </p>
      )}
    </div>
  );
}
