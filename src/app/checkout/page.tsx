"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

const PAYMENT_METHODS = [
  { id: "tarjeta", label: "Tarjeta de débito/crédito" },
  { id: "paypal", label: "PayPal" },
  { id: "mercadopago", label: "Mercado Pago" },
  { id: "ecartpay", label: "Ecart Pay" },
] as const;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<
    (typeof PAYMENT_METHODS)[number]["id"]
  >("tarjeta");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    clearCart();
  };

  if (confirmed) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-dark">
          ¡Gracias por tu pedido!
        </h1>
        <p className="font-body text-dark/70">
          Hemos recibido los datos de tu pedido. Nos pondremos en contacto
          contigo para confirmar el pago y coordinar el envío.
        </p>
        <Link
          href="/tienda"
          className="bg-dark px-8 py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-dark">
          No tienes productos en tu carrito
        </h1>
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
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 font-display text-3xl text-dark">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-12 lg:grid-cols-3"
      >
        <div className="flex flex-col gap-10 lg:col-span-2">
          <div>
            <h2 className="mb-4 font-display text-xl text-dark">
              Datos de envío
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Nombre completo"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark sm:col-span-2"
              />
              <input
                required
                type="email"
                placeholder="Correo electrónico"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
              />
              <input
                required
                type="tel"
                placeholder="Teléfono"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
              />
              <input
                required
                placeholder="Dirección"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark sm:col-span-2"
              />
              <input
                required
                placeholder="Ciudad"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
              />
              <input
                required
                placeholder="Código postal"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl text-dark">
              Método de pago
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PAYMENT_METHODS.map((method) => (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`border px-4 py-4 text-center font-body text-xs uppercase tracking-wide transition ${
                    paymentMethod === method.id
                      ? "border-dark bg-dark text-cream"
                      : "border-dark/20 text-dark/70 hover:border-dark"
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
            <p className="mt-3 font-body text-xs text-dark/40">
              El cobro se confirmará directamente contigo una vez recibido tu
              pedido.
            </p>
          </div>
        </div>

        <div className="h-fit border border-dark/10 p-6">
          <h2 className="mb-4 font-display text-xl text-dark">Resumen</h2>
          <ul className="mb-4 flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={`${item.slug}-${item.aroma}`}
                className="flex justify-between font-body text-sm text-dark/70"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice((item.price ?? 0) * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-dark/10 pt-4 font-display text-lg text-dark">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-dark py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90"
          >
            Confirmar pedido
          </button>
        </div>
      </form>
    </div>
  );
}
