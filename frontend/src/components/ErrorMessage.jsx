import React from 'react';
import styles from './ErrorMessage.module.css';

/**
 * ErrorMessage
 * Displays a friendly error state with retry action.
 * @param {{ message: string, onRetry: Function }} props
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.wrapper} role="alert">
      <span className={styles.icon} aria-hidden="true">😬</span>
      <h2 className={styles.title}>Oops!</h2>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
