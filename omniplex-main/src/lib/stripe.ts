import { loadStripe, Stripe } from '@stripe/stripe-js';
import StripeServer from 'stripe';

// Client-side Stripe instance
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }
  return stripePromise;
};

// Server-side Stripe instance

export const stripe = new StripeServer(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
});

// Product configuration
export const STRIPE_CONFIG = {
  PRO_PLAN: {
    name: 'Pro Plan',
    description: 'Unlock premium features with unlimited access',
    price: 1000, // $10.00 in cents
    currency: 'usd',
    priceId: process.env.STRIPE_PRO_PLAN_PRICE_ID,
  },
};
