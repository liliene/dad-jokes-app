/**
 * Joke Routes
 * Defines all REST endpoints for /api/jokes
 */

const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');

/**
 * @route   GET /api/jokes/random
 * @desc    Get a single random dad joke
 * @access  Public
 */
router.get('/random', jokeController.getRandomJoke);

/**
 * @route   GET /api/jokes/search?q=<term>&limit=<number>
 * @desc    Search dad jokes by keyword
 * @access  Public
 */
router.get('/search', jokeController.searchJokes);

module.exports = router;
