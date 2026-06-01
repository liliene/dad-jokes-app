import React, { useState } from 'react';
import styles from './SearchBar.module.css';

/**
 * SearchBar
 * Input for searching jokes by keyword.
 * @param {{ onSearch: Function, onClear: Function, loading: boolean }} props
 */
export default function SearchBar({ onSearch, onClear, loading }) {
  const [term, setTerm] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (term.trim()) onSearch(term.trim());
  }

  function handleClear() {
    setTerm('');
    onClear();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <div className={styles.inputWrap}>
        <span className={styles.searchIcon} aria-hidden="true">🔍</span>
        <input
          type="search"
          className={styles.input}
          placeholder="Search jokes… (e.g. dog, pizza, time)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          aria-label="Search jokes"
          disabled={loading}
        />
        {term && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className={styles.searchBtn}
        disabled={loading || !term.trim()}
        aria-label="Run search"
      >
        {loading ? 'Searching…' : 'Search'}
      </button>
    </form>
  );
}
