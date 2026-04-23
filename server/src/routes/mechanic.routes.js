const router = require('express').Router();
const { getAllMechanics, getNearbyMechanics, createMechanic } = require('../controllers/mechanic.controller');
const { protect } = require('../middlewares/auth.middleware');

router.get('/', getAllMechanics);
router.get('/nearby', getNearbyMechanics);
router.post('/', protect, createMechanic);

module.exports = router;
