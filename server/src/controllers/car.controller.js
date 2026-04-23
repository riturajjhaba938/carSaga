const Car = require('../models/Car.model');

// POST /api/cars
exports.createCar = async (req, res, next) => {
  try {
    const car = await Car.create({ ...req.body, owner: req.user.id });
    res.status(201).json(car);
  } catch (err) {
    next(err);
  }
};

// GET /api/cars
exports.getMyCars = async (req, res, next) => {
  try {
    const cars = await Car.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};

// GET /api/cars/:id
exports.getCarById = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

// PUT /api/cars/:id
exports.updateCar = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/cars/:id
exports.deleteCar = async (req, res, next) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json({ message: 'Car removed' });
  } catch (err) {
    next(err);
  }
};
