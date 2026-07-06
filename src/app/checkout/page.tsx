"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { FLAT_SHIPPING_RATE } from "@/lib/shipping";

const ACCEPTED_METHODS = ["Visa", "Mastercard", "OXXO", "SPEI"];

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const customer = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      postalCode: formData.get("postalCode"),
    };

    const res = await fetch("/api/checkout/create-preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer,
        items,
        subtotal,
        total: subtotal + FLAT_SHIPPING_RATE,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.redirectUrl) {
      setSubmitting(false);
      setError(
        data.error ??
          "No pudimos iniciar el pago. Por favor intenta de nuevo o contáctanos por WhatsApp."
      );
      return;
    }

    window.location.href = data.redirectUrl;
  };

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
                name="name"
                placeholder="Nombre completo"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark sm:col-span-2"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Correo electrónico"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
              />
              <input
                required
                name="phone"
                type="tel"
                placeholder="Teléfono"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
              />
              <input
                required
                name="address"
                placeholder="Dirección"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark sm:col-span-2"
              />
              <input
                required
                name="city"
                placeholder="Ciudad"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
              />
              <input
                required
                name="postalCode"
                placeholder="Código postal"
                className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl text-dark">
              Método de pago
            </h2>
            <div className="border border-dark bg-dark px-5 py-4 text-cream">
              <span className="font-body text-sm uppercase tracking-wide">
                Pagar con Mercado Pago
              </span>
              <p className="mt-1 font-body text-xs text-cream/70">
                Acepta tarjeta de crédito/débito de cualquier banco, OXXO y
                transferencia — no necesitas cuenta de Mercado Pago.
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {ACCEPTED_METHODS.map((method) => (
                <span
                  key={method}
                  className="border border-dark/20 px-3 py-1 font-body text-xs uppercase tracking-wide text-dark/60"
                >
                  {method}
                </span>
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
          <div className="flex flex-col gap-2 border-t border-dark/10 pt-4 font-body text-sm text-dark/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío (todo México)</span>
              <span>{formatPrice(FLAT_SHIPPING_RATE)}</span>
            </div>
          </div>
          <div className="mt-2 flex justify-between border-t border-dark/10 pt-4 font-display text-lg text-dark">
            <span>Total</span>
            <span>{formatPrice(subtotal + FLAT_SHIPPING_RATE)}</span>
          </div>
          {error && (
            <p className="mt-4 font-body text-sm text-red-700">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-dark py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Redirigiendo a Mercado Pago…" : "Pagar con Mercado Pago"}
          </button>
        </div>
      </form>
    </div>
  );
}
