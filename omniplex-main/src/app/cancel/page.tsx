"use client";

import React from "react";
import Link from "next/link";
import styles from "./cancel.module.css";

const CancelPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cancelIcon}>❌</div>
        <h1 className={styles.title}>Payment Cancelled</h1>
        <p className={styles.message}>
          Your payment was cancelled. No charges were made to your account.
        </p>
        
        <div className={styles.actions}>
          <Link href="/" className={styles.homeButton}>
            Return to Home
          </Link>
          <button 
            className={styles.retryButton}
            onClick={() => window.history.back()}
          >
            Try Again
          </button>
        </div>
        
        <div className={styles.help}>
          <p>Need help? Contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
