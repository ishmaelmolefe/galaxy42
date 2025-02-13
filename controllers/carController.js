const Car = require('../models/car');

const getPaginatedCars = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const cars = await Car.find({ available: true })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Car.countDocuments({ available: true });
    res.json({ cars, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getPaginatedCars };
