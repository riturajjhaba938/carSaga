const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    phone: { type: String, default: '' },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    specializations: [{ type: String }],
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

mechanicSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Mechanic', mechanicSchema);
