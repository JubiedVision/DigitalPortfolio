// netlify/functions/api.js
import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';

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
export const handler = serverless(app); 