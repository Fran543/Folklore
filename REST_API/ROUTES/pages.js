var express = require('express');
const verify = require('./verifyToken');
var authController = require('../CONTROLLERS/auth');
var postCreator = require('../CONTROLLERS/postCreator');

var router = express.Router();

router.post('/register', authController.register);

router.get('/register', (req, res) => {
    res.send("Hello")
});

router.post('/login', authController.login);

router.get('/login', (req, res) => {
    res.send("Hello")
});

router.post('/createPost', postCreator.createPost);

module.exports = router;