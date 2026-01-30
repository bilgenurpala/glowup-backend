const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateUserCreate, validateUserId } = require('../middlewares/validateUser'); 
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/', userController.getUsers);
router.post('/', validateUserCreate, userController.createUser);
router.put('/:id', authenticateToken, validateUserId, validateUserCreate, userController.updateUser);
router.delete('/:id', authenticateToken, validateUserId, userController.deleteUser);

module.exports = router;