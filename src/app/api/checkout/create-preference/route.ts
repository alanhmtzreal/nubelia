import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { getMercadoPagoClient, getSiteUrl, isSandboxMode } from "@/lib/mercadopago";
import { OrderData } from "@/lib/order-email";
import { FLAT_SHIPPING_RATE } from "@/lib/shipping";

export async function POST(request: NextRequest) {
  const client = getMercadoPagoClient();
  if (!client) {
    return NextResponse.json(
      { error: "Los pagos no están configurados todavía." },
      { status: 503 }
    );
  }

  const order: OrderData = await request.json();

  if (!order.items?.length) {
    return NextResponse.json({ error: "El carrito está vacío." }, { status: 400 });
  }

  const siteUrl = getSiteUrl();

  const items = order.items.map((item, index) => ({
    id: `item-${index}`,
    title: item.name + (item.aroma ? ` (${item.aroma})` : ""),
    quantity: item.quantity,
    unit_price: item.price ?? 0,
    currency_id: "MXN",
  }));

  items.push({
    id: "shipping",
    title: "Envío",
    quantity: 1,
    unit_price: FLAT_SHIPPING_RATE,
    currency_id: "MXN",
  });

  const preference = new Preference(client);

  try {
    const result = await preference.create({
      body: {
        items,
        payer: {
          name: order.customer.name,
          email: order.customer.email,
        },
        metadata: {
          customer: JSON.stringify(order.customer),
          items: JSON.stringify(order.items),
          subtotal: order.subtotal,
          shipping: FLAT_SHIPPING_RATE,
          total: order.total,
        },
        back_urls: {
          success: `${siteUrl}/checkout/exito`,
          failure: `${siteUrl}/checkout/error`,
          pending: `${siteUrl}/checkout/pendiente`,
        },
        auto_return: "approved",
        notification_url: `${siteUrl}/api/mercadopago/webhook`,
      },
    });

    const redirectUrl = isSandboxMode()
      ? result.sandbox_init_point
      : result.init_point;

    return NextResponse.json({ redirectUrl });
  } catch (error) {
    console.error("Error creando preferencia de Mercado Pago", error);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago. Intenta de nuevo." },
      { status: 502 }
    );
  }
}
