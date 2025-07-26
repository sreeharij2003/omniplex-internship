"use client";

import React, { useState } from "react";
import { getStripe } from "@/lib/stripe";
import styles from "./Pricing.module.css";

interface PricingProps {
  isOpen: boolean;
  onClose: () => void;
}

const Pricing: React.FC<PricingProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // First, setup the product and get the price ID
      const setupResponse = await fetch('/api/stripe/setup-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!setupResponse.ok) {
        throw new Error('Failed to setup product');
      }

      const setupData = await setupResponse.json();
      const priceId = setupData.price.id;

      // Create checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Upgrade to Pro</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.plan}>
            <h3 className={styles.planName}>Pro Plan</h3>
            <div className={styles.price}>
              <span className={styles.amount}>$10</span>
              <span className={styles.period}>one-time</span>
            </div>
            
            <ul className={styles.features}>
              <li>✓ Unlimited chat sessions</li>
              <li>✓ Priority support</li>
              <li>✓ Advanced AI models</li>
              <li>✓ File upload capabilities</li>
              <li>✓ Export conversations</li>
            </ul>
            
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
            
            <button
              className={styles.checkoutButton}
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Upgrade Now'}
            </button>
            
            <p className={styles.testNote}>
              <strong>Test Mode:</strong> Use card number 4242 4242 4242 4242 for testing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
