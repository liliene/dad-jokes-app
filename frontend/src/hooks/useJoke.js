/**
 * useJoke hook
 * Encapsulates joke fetching logic: state management, loading, error handling.
 * Follows the single-responsibility principle for clean component code.
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchRandomJoke } from '../services/jokeService';

export function useJoke() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchCount, setFetchCount] = useState(0); // tracks how many jokes were loaded

  const loadJoke = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchRandomJoke();
      setJoke(data);
      setFetchCount((prev) => prev + 1);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load the first joke on mount
  useEffect(() => {
    loadJoke();
  }, [loadJoke]);

  return { joke, loading, error, loadJoke, fetchCount };
}
