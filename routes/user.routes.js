const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validateUserCreate, validateUserId } = require('../middlewares/validateUser'); 

router.get('/', userController.getUsers);
router.post('/', validateUserCreate, userController.createUser);
router.put('/:id', validateUserId, validateUserCreate, userController.updateUser);
router.delete('/:id', validateUserId, userController.deleteUser);

module.exports = router;