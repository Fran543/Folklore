var express = require('express');
const verify = require('./verifyToken');
var authController = require('../CONTROLLERS/auth');

var router = express.Router();

router.post('/register', authController.register);

router.get('/register', (req, res) => {
    res.send("Hello")
});

router.post('/login', authController.login);

router.get('/login', (req, res) => {
    res.send("Hello")
});

module.exports = router;