"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutExitoPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-dark">¡Gracias por tu compra!</h1>
      <p className="font-body text-dark/70">
        Tu pago se realizó con éxito. Te contactaremos pronto para coordinar el
        envío de tu pedido.
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
