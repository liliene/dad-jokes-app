/**
 * useSearch hook
 * Encapsulates joke search logic with debouncing support.
 */

import { useState, useCallback } from 'react';
import { searchJokes } from '../services/jokeService';

export function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(async (term) => {
    if (!term || term.trim().length === 0) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchJokes(term.trim());
      setResults(data);
    } catch (err) {
      setError(err.message || 'Search failed. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
    setHasSearched(false);
  }, []);

  return { results, loading, error, hasSearched, search, clearResults };
}
