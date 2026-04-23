const Mechanic = require('../models/Mechanic.model');

// GET /api/mechanics
exports.getAllMechanics = async (req, res, next) => {
  try {
    const mechanics = await Mechanic.find({ available: true }).sort({ rating: -1 });
    res.status(200).json(mechanics);
  } catch (err) {
    next(err);
  }
};

// GET /api/mechanics/nearby?lat=&lng=&radius=
exports.getNearbyMechanics = async (req, res, next) => {
  try {
    const { lat, lng, radius = 10 } = req.query; // radius in km
    const mechanics = await Mechanic.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseFloat(radius) * 1000, // convert to meters
        },
      },
    });
    res.status(200).json(mechanics);
  } catch (err) {
    next(err);
  }
};

// POST /api/mechanics  (admin / seeding)
exports.createMechanic = async (req, res, next) => {
  try {
    const mechanic = await Mechanic.create(req.body);
    res.status(201).json(mechanic);
  } catch (err) {
    next(err);
  }
};
