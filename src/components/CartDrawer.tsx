"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-dark/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-dark/10 px-6 py-5">
          <h2 className="font-display text-xl text-dark">Tu carrito</h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="text-dark/60 hover:text-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center font-body text-sm text-dark/50">
              Tu carrito está vacío.
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={`${item.slug}-${item.aroma}`} className="flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-cream">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2 mix-blend-multiply"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="font-body text-sm text-dark">
                      {item.name}
                    </span>
                    {item.aroma && (
                      <span className="font-body text-xs text-dark/50">
                        Aroma: {item.aroma}
                      </span>
                    )}
                    <span className="mt-1 font-body text-sm text-dark/70">
                      {formatPrice(item.price)}
                    </span>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center border border-dark/20">
                        <button
                          className="px-2 py-1 text-dark/70 hover:text-dark"
                          onClick={() =>
                            updateQuantity(
                              item.slug,
                              item.quantity - 1,
                              item.aroma
                            )
                          }
                        >
                          −
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-dark/70 hover:text-dark"
                          onClick={() =>
                            updateQuantity(
                              item.slug,
                              item.quantity + 1,
                              item.aroma
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="font-body text-xs text-dark/50 underline hover:text-dark"
                        onClick={() => removeItem(item.slug, item.aroma)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-dark/10 px-6 py-5">
            <div className="mb-4 flex items-center justify-between font-display text-lg text-dark">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/carrito"
              onClick={closeCart}
              className="block w-full bg-dark py-3 text-center font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90"
            >
              Ver carrito
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
