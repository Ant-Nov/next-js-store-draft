'use client';

import { fetchClientSecret } from '@/utils/actions'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';
  const cartId = searchParams.get('cartId') || '';

  const fetchClientSecretWithCart = useCallback(() => {
    return fetchClientSecret(orderId, cartId);
  }, [orderId, cartId]);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret: fetchClientSecretWithCart }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

const CheckoutPage = () => {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  )
}
export default CheckoutPage