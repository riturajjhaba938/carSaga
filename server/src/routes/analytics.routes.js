const router = require('express').Router();
const { compareCars, getUserSummary } = require('../controllers/analytics.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);
router.get('/compare', compareCars);
router.get('/summary', getUserSummary);

module.exports = router;
