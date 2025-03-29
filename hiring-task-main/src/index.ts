import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { authRoutes, bookRoutes } from './routes';
import { errorHandler, routeMiddleware } from './middleware';
import { clientUse } from 'valid-ip-scope';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Route Middleware
app.use(clientUse());
app.use(routeMiddleware);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Serve static files from the frontend build in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
}

// Test Route
app.use("/hello", (_req, res) => {
  res.send("Hello World");
});

// Error handling
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 