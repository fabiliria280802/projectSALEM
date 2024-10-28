const express = require('express');
const {
    addingDocuments,
    getDocumentById,
    updateDocument,
    getDocumentsList
} = require('../controllers/documentController');

router.post('/', addingDocuments);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);

router.get('/', getDocumentsList);

module.exports = router;