const express = require('express');
const { getPaginatedCars } = require('../controllers/carController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/cars', authenticate, getPaginatedCars);

module.exports = router;
