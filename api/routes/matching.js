const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth');
const matchingController = require('../controllers/matching')

// protected routes

// input : language , preference
router.get('/search_match/:user_id/:preference/:language', matchingController.create_match  );


module.exports = router