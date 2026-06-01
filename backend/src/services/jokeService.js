/**
 * JokeService
 * Responsible for fetching jokes from the external public API.
 * Abstracts the external dependency, making it easy to swap providers.
 */

const axios = require('axios');

const BASE_URL = process.env.JOKES_API_URL || 'https://icanhazdadjoke.com';

// Shared axios instance pre-configured for icanhazdadjoke.com
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 8000, // 8 second timeout
  headers: {
    Accept: 'application/json',
    'User-Agent': 'DadJokesApp/1.0 (https://github.com/your-user/dad-jokes-app)',
  },
});

/**
 * Fetches a single random dad joke from the external API.
 * @returns {Promise<{ id: string, joke: string }>}
 */
async function getRandomJoke() {
  try {
    const response = await apiClient.get('/');

    // Validate the response shape
    if (!response.data || !response.data.joke) {
      throw new Error('Invalid response structure from external API');
    }

    return {
      id: response.data.id,
      joke: response.data.joke,
    };
  } catch (error) {
    // Re-throw with a descriptive message for the controller to handle
    if (error.code === 'ECONNABORTED') {
      throw new Error('External API request timed out. Please try again.');
    }
    if (error.response) {
      throw new Error(
        `External API responded with status ${error.response.status}`
      );
    }
    if (error.request) {
      throw new Error('Could not reach the external joke API. Check your network.');
    }
    throw error;
  }
}

/**
 * Searches for jokes by a given term.
 * @param {string} term - Search term
 * @param {number} limit - Max results (default 10)
 * @returns {Promise<Array<{ id: string, joke: string }>>}
 */
async function searchJokes(term, limit = 10) {
  try {
    const response = await apiClient.get('/search', {
      params: { term, limit, page: 1 },
    });

    if (!response.data || !Array.isArray(response.data.results)) {
      throw new Error('Invalid search response structure from external API');
    }

    return response.data.results.map((item) => ({
      id: item.id,
      joke: item.joke,
    }));
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Search request timed out. Please try again.');
    }
    if (error.response) {
      throw new Error(
        `External API search responded with status ${error.response.status}`
      );
    }
    throw error;
  }
}

module.exports = { getRandomJoke, searchJokes };
