import Link from "next/link";

export default function CheckoutPendientePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-dark">
        Tu pago está pendiente
      </h1>
      <p className="font-body text-dark/70">
        Recibimos tu intento de pago, pero todavía está en proceso de
        confirmación (por ejemplo, si elegiste pagar en OXXO o por
        transferencia). Te avisaremos en cuanto se confirme.
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
