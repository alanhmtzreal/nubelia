import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.ORDER_NOTIFICATION_EMAIL;

  if (!apiKey || !notifyEmail) {
    return NextResponse.json(
      { error: "El envío de correos no está configurado todavía." },
      { status: 503 }
    );
  }

  const { businessName, contactName, email, phone, message } =
    await request.json();

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Nubelia <notificaciones@nubelia.app>",
    to: notifyEmail,
    replyTo: email,
    subject: `Nueva solicitud de distribución: ${businessName}`,
    html: `
      <h2>Nueva solicitud de distribución (negocio)</h2>
      <p><strong>Negocio:</strong> ${businessName}</p>
      <p><strong>Contacto:</strong> ${contactName}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message || "(sin mensaje adicional)"}</p>
    `,
  });

  if (error) {
    return NextResponse.json(
      { error: "No se pudo enviar la solicitud." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
