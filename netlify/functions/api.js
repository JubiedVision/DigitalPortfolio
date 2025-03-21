// netlify/functions/api.js
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

// Create express instance
const app = express();

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Add your other API routes here...

// Export the serverless function
module.exports.handler = serverless(app); 