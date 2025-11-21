const express = require(express)
const router = express.Router();

const {registerUser, loginUser, logingUser} = require('../controllers/authController');

// ============================================
// DEFINE ROUTES
// ============================================

// Route:   POST /api/auth/register
// Desc:    Register a new user
// Access:  Public
router.post('/register', registerUser);

// Route:   POST /api/auth/login
// Desc:    Login user & get token
// Access:  Public
router.post('/login', logingUser);

module.exports = router;