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

  const { name, email, message } = await request.json();

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Nubelia <notificaciones@nubelia.app>",
    to: notifyEmail,
    replyTo: email,
    subject: `Nuevo mensaje de contacto de ${name}`,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `,
  });

  if (error) {
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
