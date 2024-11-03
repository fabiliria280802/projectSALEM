const express = require('express');
const multer = require('multer');
const path = require('path');
const {
	addingDocuments,
	getDocumentById,
	updateDocument,
	getDocumentsList,
} = require('../controllers/documentController');


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, path.join(__dirname, '../data'));  // Guardar en la carpeta "backend/data"
	},
	filename: (req, file, cb) => {
	  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
	  cb(null, uniqueSuffix + '-' + file.originalname);  // Nombre único para evitar conflictos
	}
  });
  const upload = multer({ storage });
  const router = express.Router();

router.post('/', upload.single('file'), addingDocuments);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);
router.get('/', getDocumentsList);

module.exports = router;
