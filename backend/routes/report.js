const express = require('express');
const {
	getAReport,
	getAllReports,
	createReport,
	updateReport,
	deleteReport
} = require('../controllers/reportController');

const router = express.Router();

router.get('/', getAllReports);
router.get('/:id', getAReport);
router.post('/', createReport);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

module.exports = router;