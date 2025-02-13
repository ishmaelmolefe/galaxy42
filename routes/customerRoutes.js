const express = require('express');
const { getCustomerData } = require('../controllers/customerController');
const { getCustomerInsights } = require('../controllers/customerControllerInsight');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/customer-transaction', authenticate, getCustomerData);
router.post('/customer-insight', authenticate, getCustomerInsights);

module.exports = router;
