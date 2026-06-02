import React from 'react';
import JokeCard from '../components/JokeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import { useJoke } from '../hooks/useJoke';
import { useSearch } from '../hooks/useSearch';
import styles from './Home.module.css';

/**
 * Home page
 * Main view composing all joke-related components.
 */
export default function Home() {
  const { joke, loading, error, loadJoke, fetchCount } = useJoke();
  const {
    results,
    loading: searchLoading,
    error: searchError,
    hasSearched,
    search,
    clearResults,
  } = useSearch();

  function handleNewJoke() {
    clearResults();
    loadJoke();
  }

  return (
    <main className={styles.main}>
      {/* ── Random Joke Section ─────────────────── */}
      <section className={styles.randomSection}>
        <div className={styles.sectionLabel}>
          <span className={styles.labelDot} />
          Random Joke
        </div>

        {/* Card area: show spinner / error / joke */}
        <div className={styles.cardArea}>
          {loading && <LoadingSpinner message="Fetching a hilarious dad joke…" />}
          {!loading && error && (
            <ErrorMessage message={error} onRetry={handleNewJoke} />
          )}
          {!loading && !error && joke && (
            <JokeCard joke={joke.joke} jokeId={joke.id} fetchCount={fetchCount} />
          )}
        </div>

        <button
          className={styles.newJokeBtn}
          onClick={handleNewJoke}
          disabled={loading}
          aria-label="Get a new random joke"
        >
          <span className={styles.btnIcon} aria-hidden="true">🎲</span>
          {loading ? 'Loading…' : 'New Joke'}
        </button>

        {/* Counter */}
        {fetchCount > 1 && (
          <p className={styles.counter}>
            You laughed in front of <strong>{fetchCount}</strong> jokes today 🎉
          </p>
        )}
      </section>

      {/* ── Divider ─────────────────────────────── */}
      <div className={styles.divider}>
        <span>or search by keyword</span>
      </div>

      {/* ── Search Section ───────────────────────── */}
      <section className={styles.searchSection}>
        <SearchBar
          onSearch={search}
          onClear={clearResults}
          loading={searchLoading}
        />

        {searchLoading && <LoadingSpinner message="Searching the joke vault…" />}

        {!searchLoading && searchError && (
          <ErrorMessage message={searchError} />
        )}

        {!searchLoading && !searchError && (
          <SearchResults results={results} hasSearched={hasSearched} />
        )}
      </section>
    </main>
  );
}
