import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at port number ${PORT}`);
});
