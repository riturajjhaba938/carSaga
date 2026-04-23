const Report = require('../models/Report.model');
const Car = require('../models/Car.model');

// GET /api/analytics/compare?car1=&car2=
exports.compareCars = async (req, res, next) => {
  try {
    const { car1, car2 } = req.query;
    const [carA, carB] = await Promise.all([
      Car.findById(car1),
      Car.findById(car2),
    ]);
    if (!carA || !carB) return res.status(404).json({ message: 'One or both cars not found' });

    const [reportA, reportB] = await Promise.all([
      Report.findOne({ car: car1 }).sort({ createdAt: -1 }),
      Report.findOne({ car: car2 }).sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
      car1: { car: carA, report: reportA },
      car2: { car: carB, report: reportB },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/analytics/summary
exports.getUserSummary = async (req, res, next) => {
  try {
    const totalCars = await Car.countDocuments({ owner: req.user.id });
    const verified = await Car.countDocuments({ owner: req.user.id, status: 'verified' });
    const flagged = await Car.countDocuments({ owner: req.user.id, status: 'flagged' });
    res.status(200).json({ totalCars, verified, flagged, safeToBuy: verified });
  } catch (err) {
    next(err);
  }
};
