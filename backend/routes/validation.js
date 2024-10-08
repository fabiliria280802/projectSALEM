const express = require('express');
const {
	getValidationById,
	getAllValidations,
	createValidation,
	updateValidation,
	deleteValidation
} = require('../controllers/validationController');
const { isAdmin } = require('../helpers/roleHelper');
const router = express.Router();

router.get('/', getAllValidations);
router.get('/:id', getValidationById);
router.post('/', createValidation);
router.put('/:id', isAdmin, updateValidation);
router.delete('/:id', isAdmin, deleteValidation);

module.exports = router;
