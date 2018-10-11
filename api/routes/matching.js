const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth');

const userController = require('../controllers/user');

// protected routes

// input : language , preference
router.get('/', (res, req, next) => {
    // check where search_spark === true & language === same_as_input & preference === same_as_input 
    // .then
    // create new relation with both ID's
    // set both user.search_spark to false
});


module.exports = router