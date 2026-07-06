import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { getMercadoPagoClient } from "@/lib/mercadopago";
import { sendOrderNotificationEmail, OrderData } from "@/lib/order-email";

export async function POST(request: NextRequest) {
  const client = getMercadoPagoClient();
  if (!client) {
    return NextResponse.json({ ok: true });
  }

  const url = new URL(request.url);
  const paymentId =
    url.searchParams.get("data.id") ?? url.searchParams.get("id");
  const topic = url.searchParams.get("type") ?? url.searchParams.get("topic");

  if (!paymentId || (topic && topic !== "payment")) {
    return NextResponse.json({ ok: true });
  }

  try {
    const payment = new Payment(client);
    const result = await payment.get({ id: paymentId });

    if (result.status !== "approved") {
      return NextResponse.json({ ok: true });
    }

    const metadata = result.metadata as Record<string, unknown> | undefined;
    if (!metadata?.customer || !metadata?.items) {
      return NextResponse.json({ ok: true });
    }

    const order: OrderData = {
      customer: JSON.parse(metadata.customer as string),
      items: JSON.parse(metadata.items as string),
      subtotal: Number(metadata.subtotal ?? 0),
      shipping: Number(metadata.shipping ?? 0),
      total: Number(metadata.total ?? 0),
    };

    await sendOrderNotificationEmail(order);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error procesando webhook de Mercado Pago", error);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
