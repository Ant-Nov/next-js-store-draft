import prisma from '@/lib/prisma'
import { stripe } from '@/lib/stripe' // Your Stripe instance
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('STRIPE WEBHOOK');
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return Response.json({ error: 'No signature' }, { status: 400 })
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return Response.json({ error: 'Webhook error' }, { status: 400 })
  }

  console.log('post after try catch')

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const metadata = event.data.object.metadata as { orderId: string; cartId: string; };
    const orderId = metadata?.orderId;
    const cartId = metadata?.cartId;


    await prisma.order.update({
      where: { id: orderId },
      data: { isPaid: true }
    });

    await prisma.cart.delete({
      where: { id: cartId },
    });
  }

  return Response.json({ received: true })
}
