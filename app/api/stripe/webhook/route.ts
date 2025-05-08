import { confirmOrder } from "@/app/_lib/confirmOrder";
import { stripe } from "@/app/_lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false, // ❗️Important: prevent Next.js from parsing body
  },
};

//todo : add the endpoint of the webhook in the dashboard on stripe website

// Required to read raw body in App Router (Edge doesn't support this well)
export async function POST(request: NextRequest) {
  const rawBody = await request.arrayBuffer();
  const body = Buffer.from(rawBody);
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 },
    );
  }

  // ✅ Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      console.log("Payment successful for order:", orderId);

      const result = await confirmOrder(orderId!); // no userId check in webhook

      if (!result.success) {
        console.error("Order confirmation failed:", result.error);
        return NextResponse.json({ success: false }, { status: 500 });
      }

      break;

    case "checkout.session.async_payment_failed":
      const failedSession = event.data.object as Stripe.Checkout.Session;
      const failedOrderId = failedSession.metadata?.orderId;
      console.log("Payment failed for order:", failedOrderId);
      break;

    case "checkout.session.async_payment_succeeded":
      const succeededSession = event.data.object as Stripe.Checkout.Session;
      const succeededOrderId = succeededSession.metadata?.orderId;
      console.log("Payment succeeded for order:", succeededOrderId);
      break;

    case "checkout.session.expired":
      const expiredSession = event.data.object as Stripe.Checkout.Session;
      const expiredOrderId = expiredSession.metadata?.orderId;
      console.log("Payment expired for order:", expiredOrderId);
      break;

    // Handle other events you care about
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
