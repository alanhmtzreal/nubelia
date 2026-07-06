import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { formatPrice } from "@/lib/format";

interface OrderItem {
  name: string;
  price: number | null;
  quantity: number;
  aroma?: string;
}

interface OrderPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}

const PAYMENT_LABELS: Record<string, string> = {
  tarjeta: "Tarjeta de débito/crédito",
  paypal: "PayPal",
  mercadopago: "Mercado Pago",
  ecartpay: "Ecart Pay",
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.ORDER_NOTIFICATION_EMAIL;

  if (!apiKey || !notifyEmail) {
    return NextResponse.json(
      { error: "El envío de correos no está configurado todavía." },
      { status: 503 }
    );
  }

  const order: OrderPayload = await request.json();

  const itemsHtml = order.items
    .map(
      (item) =>
        `<li>${item.name}${item.aroma ? ` (${item.aroma})` : ""} × ${
          item.quantity
        } — ${formatPrice((item.price ?? 0) * item.quantity)}</li>`
    )
    .join("");

  const html = `
    <h2>Nuevo pedido en Nubelia</h2>
    <h3>Cliente</h3>
    <p>
      ${order.customer.name}<br/>
      ${order.customer.email}<br/>
      ${order.customer.phone}
    </p>
    <h3>Envío</h3>
    <p>
      ${order.customer.address}<br/>
      ${order.customer.city}, CP ${order.customer.postalCode}
    </p>
    <h3>Productos</h3>
    <ul>${itemsHtml}</ul>
    <p>
      Subtotal: ${formatPrice(order.subtotal)}<br/>
      Envío: ${formatPrice(order.shipping)}
    </p>
    <h3>Total: ${formatPrice(order.total)}</h3>
    <p>Método de pago elegido: ${
      PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod
    }</p>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Nubelia <notificaciones@nubelia.app>",
    to: notifyEmail,
    replyTo: order.customer.email,
    subject: `Nuevo pedido de ${order.customer.name}`,
    html,
  });

  if (error) {
    return NextResponse.json(
      { error: "No se pudo enviar el correo del pedido." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
