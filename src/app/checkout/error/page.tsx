import Link from "next/link";

export default function CheckoutErrorPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-dark">
        No se pudo completar el pago
      </h1>
      <p className="font-body text-dark/70">
        Tu pago no se pudo procesar. Tus productos siguen en el carrito, puedes
        intentarlo de nuevo o contactarnos por WhatsApp si el problema
        continúa.
      </p>
      <Link
        href="/checkout"
        className="bg-dark px-8 py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90"
      >
        Volver al checkout
      </Link>
    </div>
  );
}
