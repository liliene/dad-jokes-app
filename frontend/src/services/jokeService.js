/**
 * jokeService.js
 * Handles all HTTP communication with the backend API.
 * Using fetch (built-in) to avoid extra dependencies.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

/**
 * Fetches a single random joke from the backend.
 * @returns {Promise<{ id: string, joke: string }>}
 */
export async function fetchRandomJoke() {
  const response = await fetch(`${BASE_URL}/api/jokes/random`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  const data = await response.json();
  return data.data; // { id, joke }
}

/**
 * Searches jokes by term.
 * @param {string} term
 * @returns {Promise<Array<{ id: string, joke: string }>>}
 */
export async function searchJokes(term) {
  const response = await fetch(
    `${BASE_URL}/api/jokes/search?q=${encodeURIComponent(term)}`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server error: ${response.status}`);
  }

  const data = await response.json();
  return data.data; // Array of { id, joke }
}
