import React, { useEffect, useRef } from 'react';
import styles from './JokeCard.module.css';

/**
 * JokeCard
 * Displays a single joke with animated entrance.
 * @param {{ joke: string, jokeId: string, fetchCount: number }} props
 */
export default function JokeCard({ joke, jokeId, fetchCount }) {
  const cardRef = useRef(null);

  // Trigger pop-in animation every time a new joke arrives
  useEffect(() => {
    if (!cardRef.current) return;
    cardRef.current.classList.remove(styles.pop);
    void cardRef.current.offsetWidth; // reflow trick
    cardRef.current.classList.add(styles.pop);
  }, [fetchCount]);

  return (
    <div className={styles.card} ref={cardRef} aria-live="polite" aria-atomic="true">
      {/* Decorative quote mark */}
      <span className={styles.quoteOpen} aria-hidden="true">"</span>
      <p className={styles.jokeText}>{joke}</p>
      <span className={styles.quoteClose} aria-hidden="true">"</span>
      {jokeId && (
        <span className={styles.jokeId} title="Joke ID">#{jokeId}</span>
      )}
    </div>
  );
}
