const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', contactRoutes);

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error('DB connection error:', err));
