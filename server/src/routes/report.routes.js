const router = require('express').Router();
const { createReport, getMyReports, getReportById } = require('../controllers/report.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);
router.route('/').get(getMyReports).post(createReport);
router.route('/:id').get(getReportById);

module.exports = router;
