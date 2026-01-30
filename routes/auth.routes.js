const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authenticateToken = require('../middlewares/authMiddleware');
const { register } = require('../services/auth.service');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/me', authenticateToken, authController.getMe);

module.exports = router;