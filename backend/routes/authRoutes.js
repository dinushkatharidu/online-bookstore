const express = require("express");
const router = express.Router();

const {registerUser, logingUser} = require('../controllers/authController');

router.post('/register', registerUser);

router.post('/login', logingUser);

module.exports = router;