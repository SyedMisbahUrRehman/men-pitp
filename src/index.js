require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const { error } = require('./utils/response');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api/students', studentRoutes);

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

app.use((req, res) => {
  return error(res, 404, 'Route not found');
});

app.use((err, req, res, next) => {
  return error(res, 500, 'Internal server error', err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
