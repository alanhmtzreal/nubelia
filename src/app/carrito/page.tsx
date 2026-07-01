"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-dark">Tu carrito está vacío</h1>
        <p className="font-body text-dark/60">
          Explora nuestro catálogo y encuentra el aroma ideal para tu espacio.
        </p>
        <Link
          href="/tienda"
          className="bg-dark px-8 py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-10 font-display text-3xl text-dark">Tu carrito</h1>

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <div
            key={`${item.slug}-${item.aroma}`}
            className="flex items-center gap-6 border-b border-dark/10 pb-6"
          >
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden bg-white/50">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain p-3"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg text-dark">{item.name}</h3>
              {item.aroma && (
                <p className="font-body text-sm text-dark/50">
                  Aroma: {item.aroma}
                </p>
              )}
              <p className="mt-1 font-body text-sm text-dark/70">
                {formatPrice(item.price)}
              </p>
            </div>
            <div className="flex items-center border border-dark/20">
              <button
                className="px-3 py-2 text-dark/70 hover:text-dark"
                onClick={() =>
                  updateQuantity(item.slug, item.quantity - 1, item.aroma)
                }
              >
                −
              </button>
              <span className="px-4 text-sm">{item.quantity}</span>
              <button
                className="px-3 py-2 text-dark/70 hover:text-dark"
                onClick={() =>
                  updateQuantity(item.slug, item.quantity + 1, item.aroma)
                }
              >
                +
              </button>
            </div>
            <span className="w-28 text-right font-body text-sm text-dark">
              {formatPrice((item.price ?? 0) * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.slug, item.aroma)}
              aria-label="Quitar producto"
              className="text-dark/40 hover:text-dark"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-end gap-4">
        <div className="flex w-full max-w-xs items-center justify-between font-display text-xl text-dark sm:w-72">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <Link
          href="/checkout"
          className="w-full max-w-xs bg-dark py-3 text-center font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90 sm:w-72"
        >
          Continuar al pago
        </Link>
      </div>
    </div>
  );
}
