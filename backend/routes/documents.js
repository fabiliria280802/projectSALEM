const express = require('express');
const {
	addingDocuments,
	getDocumentById,
	updateDocument,
	getDocumentsList,
} = require('../controllers/documentController');
const router = express.Router();
router.post('/', addingDocuments);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);
router.get('/', getDocumentsList);

module.exports = router;
