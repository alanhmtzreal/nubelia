"use client";

import { useState } from "react";

export default function DistribucionForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center border border-dark/10 p-10 text-center">
        <h3 className="font-display text-xl text-dark">¡Listo!</h3>
        <p className="mt-3 font-body text-sm text-dark/70">
          Recibimos tu información. Te contactaremos pronto para platicar
          sobre tu negocio.
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
        const res = await fetch("/api/distribucion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessName: formData.get("businessName"),
            contactName: formData.get("contactName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message"),
          }),
        });

        setSending(false);

        if (!res.ok) {
          setError(
            "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp."
          );
          return;
        }

        setSent(true);
      }}
      className="flex flex-col gap-4 border border-dark/10 p-6"
    >
      <input
        required
        name="businessName"
        placeholder="Nombre del negocio"
        className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
      />
      <input
        required
        name="contactName"
        placeholder="Nombre de contacto"
        className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
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
      <textarea
        name="message"
        placeholder="Cuéntanos sobre tu negocio y qué necesitas"
        rows={4}
        className="border border-dark/20 bg-white/50 px-4 py-3 font-body text-sm text-dark"
      />
      {error && <p className="font-body text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="bg-dark py-3 font-body text-sm uppercase tracking-widest text-cream transition hover:opacity-90 disabled:opacity-50"
      >
        {sending ? "Enviando…" : "Enviar solicitud"}
      </button>
    </form>
  );
}
