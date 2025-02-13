const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true, match: /.+\@.+\..+/ },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  totalCost: { type: Number, required: true },
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
