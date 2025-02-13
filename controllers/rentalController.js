const Rental = require('../models/rental');

const getRentals = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 
  try {
    const rentals = await Rental.find()
      .populate('carId')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Rental.countDocuments();

    res.json({
      rentals,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rentals' });
  }
};

module.exports = { getRentals };
