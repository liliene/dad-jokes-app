/**
 * JokeController
 * Handles HTTP request/response logic for joke endpoints.
 * Delegates business logic to JokeService.
 */

const jokeService = require('../services/jokeService');

async function getRandomJoke(req, res, next) {
  try {
    const joke = await jokeService.getRandomJoke();

    res.status(200).json({
      success: true,
      data: joke,
    });
  } catch (error) {
    next(error);
  }
}

async function searchJokes(req, res, next) {
  try {
    const { q, limit } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Query parameter "q" is required and cannot be empty.',
      });
    }

    const jokes = await jokeService.searchJokes(q.trim(), Number(limit) || 10);

    res.status(200).json({
      success: true,
      count: jokes.length,
      data: jokes,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getRandomJoke, searchJokes };
