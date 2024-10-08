const express = require('express');
const {
	getAUser,
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	changePassword
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getAUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.put('/:currentUserId/:userIdToModify', changePassword);
router.delete('/:id', deleteUser);

module.exports = router;
