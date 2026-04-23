const router = require('express').Router();
const { createCar, getMyCars, getCarById, updateCar, deleteCar } = require('../controllers/car.controller');
const { protect } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.use(protect);
router.route('/').get(getMyCars).post(upload.array('photos', 10), createCar);
router.route('/:id').get(getCarById).put(updateCar).delete(deleteCar);

module.exports = router;
