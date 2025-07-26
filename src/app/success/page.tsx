"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./success.module.css";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      // In a real app, you would verify the session on the server
      // For this demo, we'll just show a success message
      setSessionData({ id: sessionId });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.successIcon}>✅</div>
        <h1 className={styles.title}>Payment Successful!</h1>
        <p className={styles.message}>
          Thank you for upgrading to Pro! Your payment has been processed successfully.
        </p>
        
        {sessionId && (
          <div className={styles.sessionInfo}>
            <p className={styles.sessionId}>
              <strong>Session ID:</strong> {sessionId}
            </p>
          </div>
        )}
        
        <div className={styles.features}>
          <h3>What&apos;s included in your Pro plan:</h3>
          <ul>
            <li>✓ Unlimited chat sessions</li>
            <li>✓ Priority support</li>
            <li>✓ Advanced AI models</li>
            <li>✓ File upload capabilities</li>
            <li>✓ Export conversations</li>
          </ul>
        </div>
        
        <div className={styles.actions}>
          <Link href="/" className={styles.homeButton}>
            Return to Home
          </Link>
        </div>
        
        <div className={styles.testNote}>
          <strong>Test Mode:</strong> This was a test payment using Stripe&apos;s test environment.
          No real money was charged.
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
