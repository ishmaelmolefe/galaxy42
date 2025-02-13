const Rental = require('../models/rental');

const getRentalInsights = async (req, res) => {
  try {

    const rentals = await Rental.find().populate('carId').exec();

    const availableCars = rentals.filter(rental => rental.carId.available).length;
    const unavailableCars = rentals.filter(rental => !rental.carId.available).length;

    const carModels = rentals.reduce((acc, rental) => {
      const model = `${rental.carId.make} ${rental.carId.model}`;
      acc[model] = (acc[model] || 0) + 1;
      return acc;
    }, {});

    const completedRentals = rentals.filter(rental => rental.status === 'completed');
    const completedRentalsCount = completedRentals.length;
    const completedTotalCost = completedRentals.reduce((acc, rental) => acc + rental.totalCost, 0);

    const activeRentals = rentals.filter(rental => rental.status === 'active');
    const activeRentalsCount = activeRentals.length;
    const activeTotalCost = activeRentals.reduce((acc, rental) => acc + rental.totalCost, 0);

    const numberOfCustomers = new Set(rentals.map(rental => rental.customerEmail)).size;

    const carBrandCounts = rentals.reduce((acc, rental) => {
      const brand = rental.carId.make; 
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {});

    const top5Brands = Object.entries(carBrandCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5)
      .map(([brand, count]) => `${brand}: ${count}`);

    res.json({
      insights: {
        totalCars: rentals.length,
        availableCars,
        unavailableCars,
        carModels,
        completedRentalsCount,
        completedTotalCost,
        activeRentalsCount,
        activeTotalCost,
        numberOfCustomers,
        top5Brands
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rental insights' });
  }
};

module.exports = { getRentalInsights };
