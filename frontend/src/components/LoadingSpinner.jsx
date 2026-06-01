import React from 'react';
import styles from './LoadingSpinner.module.css';

/**
 * LoadingSpinner
 * Animated visual feedback shown during API requests.
 */
export default function LoadingSpinner({ message = 'Fetching a joke...' }) {
  return (
    <div className={styles.wrapper} role="status" aria-label={message}>
      <div className={styles.ring}>
        <div /><div /><div /><div />
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
