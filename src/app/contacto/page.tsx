import type { Metadata } from "next";
import ContactoForm from "./ContactoForm";

export const metadata: Metadata = {
  title: "Contacto | Nubelia",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-body text-xs uppercase tracking-[0.3em] text-dark/50">
        Nubelia
      </p>
      <h1 className="mt-2 font-display text-4xl text-dark">Contacto</h1>
      <p className="mt-4 max-w-xl font-body text-dark/70">
        ¿Tienes dudas sobre nuestros productos o quieres hacer un pedido
        especial? Escríbenos.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4 font-body text-dark/70">
          <p>
            <span className="font-semibold text-dark">WhatsApp:</span> 833 205
            1214
          </p>
          <p>
            <span className="font-semibold text-dark">Correo:</span>{" "}
            hola@nubelia.mx
          </p>
          <p>
            <span className="font-semibold text-dark">Ubicación:</span>{" "}
            Tampico, Tamaulipas
          </p>
        </div>

        <ContactoForm />
      </div>
    </div>
  );
}
