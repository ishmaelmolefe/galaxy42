require('dotenv').config();

const axios = require('axios');

const getCustomerData = async (req, res) => {
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

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching customer data:', error.message);
    res.status(500).json({ error: 'Failed to fetch transactions', details: error.message });
  }
};

module.exports = { getCustomerData };
