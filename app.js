const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./configs/db');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();


app.use(cors());

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use(authRoutes);
app.use(carRoutes);
app.use(rentalRoutes);
app.use(customerRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
