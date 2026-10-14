import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import projectRoutes from "./Routes/projectRoutes.js";
import skillRoutes from "./Routes/skillRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'https://angel-of-unknown.vercel.app',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Root & Healthcheck routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio Backend API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', async (req, res) => {
  try {
    await connectDB();
    res.json({
      success: true,
      message: 'Server and Database are healthy',
      database: 'connected',
      mongoUriSet: Boolean(process.env.MONGODB_URI),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      database: 'disconnected',
      error: error.message,
      mongoUriSet: Boolean(process.env.MONGODB_URI),
    });
  }
});

// Middleware to ensure DB is connected before processing requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Database Connection Failed: ${error.message}`,
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running at port number ${PORT}`);
  });
}

export default app;
