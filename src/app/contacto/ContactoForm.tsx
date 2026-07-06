"use client";

import { useState } from "react";

export default function ContactoForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center border border-dark/10 p-10 text-center">
        <h3 className="font-display text-xl text-dark">¡Mensaje enviado!</h3>
        <p className="mt-3 font-body text-sm text-dark/70">
          Gracias por escribirnos, te responderemos lo antes posible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        setSending(true);

        const formData = new FormData(e.currentTarget);
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
          }),
        });

        setSending(false);

        if (!res.ok) {
          setError(
            "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp."
          );
          return;
        }

        setSent(true);
      }}
      className="flex flex-col gap-4 border border-dark/10 p-6"
    >
      <input
        required
        name="name"
        placeholder="Nombre"
        className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
      />
      <input
        required
        name="email"
        type="email"
        placeholder="Correo electrónico"
        className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
      />
      <textarea
        required
        name="message"
        placeholder="Mensaje"
        rows={5}
        className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
      />
      {error && <p className="font-body text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="bg-dark py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90 disabled:opacity-50"
      >
        {sending ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
