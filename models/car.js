const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  pricePerMonth: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
