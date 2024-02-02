const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const policiesRoutes = require('./routes/policies');
const remindersRoutes = require('./routes/reminders');
const db = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/policies', policiesRoutes);
app.use('/reminders', remindersRoutes);

// Default route for the API
app.get('/', (req, res) => {
  res.send('Welcome to the Document Policy Manager API');
});

// Handling 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Connected to MongoDB:', db.host);
});

