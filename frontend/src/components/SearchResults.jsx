import React from 'react';
import styles from './SearchResults.module.css';

/**
 * SearchResults
 * Renders a list of jokes returned from a keyword search.
 * @param {{ results: Array, hasSearched: boolean }} props
 */
export default function SearchResults({ results, hasSearched }) {
  if (!hasSearched) return null;

  if (results.length === 0) {
    return (
      <div className={styles.empty} role="status">
        <span aria-hidden="true">🤷</span>
        <p>No jokes found for that term. Try something else!</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        Found <strong>{results.length}</strong> joke{results.length !== 1 ? 's' : ''}
      </h2>
      <ul className={styles.list}>
        {results.map((item, index) => (
          <li key={item.id} className={styles.item} style={{ animationDelay: `${index * 50}ms` }}>
            <span className={styles.num}>{index + 1}</span>
            <p className={styles.text}>{item.joke}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
