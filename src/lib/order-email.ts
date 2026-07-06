import { Resend } from "resend";
import { formatPrice } from "@/lib/format";

export interface OrderItem {
  name: string;
  price: number | null;
  quantity: number;
  aroma?: string;
}

export interface OrderData {
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
}

export async function sendOrderNotificationEmail(
  order: OrderData
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.ORDER_NOTIFICATION_EMAIL;

  if (!apiKey || !notifyEmail) {
    return { ok: false, error: "El envío de correos no está configurado todavía." };
  }

  const itemsHtml = order.items
    .map(
      (item) =>
        `<li>${item.name}${item.aroma ? ` (${item.aroma})` : ""} × ${
          item.quantity
        } — ${formatPrice((item.price ?? 0) * item.quantity)}</li>`
    )
    .join("");

  const html = `
    <h2>Nuevo pedido pagado en Nubelia</h2>
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
    <p>Pagado con Mercado Pago.</p>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Nubelia <notificaciones@nubelia.app>",
    to: notifyEmail,
    replyTo: order.customer.email,
    subject: `Nuevo pedido pagado de ${order.customer.name}`,
    html,
  });

  if (error) {
    return { ok: false, error: "No se pudo enviar el correo del pedido." };
  }

  return { ok: true };
}
