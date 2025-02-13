const express = require('express');
const { getRentals } = require('../controllers/rentalController');
const { getRentalInsights } = require('../controllers/rentalControllerInsight');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/rentals', authenticate, getRentals);
router.get('/rentals-insight', authenticate, getRentalInsights);

module.exports = router;
