// Load environment variables from .env file
require('dotenv').config();

const axios = require('axios');

const getCustomerInsights = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = process.env.API_URL;

    const currentDate = new Date();
    const startDate = currentDate.toISOString().split('T')[0]; 
    const endDate = startDate; 

    const response = await axios.post(url, {
      start_date: startDate,
      end_date: endDate,
    }, {
      headers: { 'x-api-key': apiKey },
    });

    const transactions = response.data;

    const totalTransactions = transactions.length;
    const totalNullValues = countNullValues(transactions);
    const capturedTransactions = totalTransactions - totalNullValues;

    const insights = {
      topCategories: getTopCategories(transactions),
      totalTransactions,
      capturedTransactions, // Newly added field
      totalProfit: calculateTotalProfit(transactions),
      totalNullValues,
      topCustomers: getTopCustomers(transactions),
      topSpenders: getTopSpenders(transactions),
    };

    res.json(insights);
  } catch (error) {
    console.error('Error fetching insights:', error);
    res.status(500).json({ error: 'Failed to generate insights', details: error.message });
  }
};

const getTopCategories = (transactions) => {
  const categoryCounts = {};

  transactions.forEach(({ spend_category }) => {
    if (spend_category) {
      categoryCounts[spend_category] = (categoryCounts[spend_category] || 0) + 1;
    }
  });

  return Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category, count]) => ({ category, count }));
};

const getTopCustomers = (transactions) => {
  const customerCounts = {};

  transactions.forEach(({ customer_id }) => {
    customerCounts[customer_id] = (customerCounts[customer_id] || 0) + 1;
  });

  return Object.entries(customerCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([customerId, count]) => ({ customerId, count }));
};

const countNullValues = (transactions) => {
  let nullCount = 0;

  transactions.forEach((transaction) => {
    Object.values(transaction).forEach((value) => {
      if (value === null || value === undefined) {
        nullCount++;
      }
    });
  });

  return nullCount;
};

const calculateTotalProfit = (transactions) => {
  let totalProfit = 0;

  transactions.forEach(({ transaction_amount }) => {
    if (transaction_amount) {
      totalProfit += transaction_amount;
    }
  });

  return parseFloat(totalProfit.toFixed(2)); 
};

const getTopSpenders = (transactions) => {
  const customerSpendings = {};

  transactions.forEach(({ customer_id, transaction_amount }) => {
    customerSpendings[customer_id] = (customerSpendings[customer_id] || 0) + transaction_amount;
  });

  return Object.entries(customerSpendings)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([customerId, amount]) => ({ customerId, amount: parseFloat(amount.toFixed(2)) }));
};

module.exports = { getCustomerInsights };
