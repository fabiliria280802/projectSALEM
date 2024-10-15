const express = require('express');
const {
    addingDocuments
} = require('../controllers/documentController');

const router = express.Router();

router.post('/', addingDocuments);

module.exports = router;