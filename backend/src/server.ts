import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app: Express = express();
const PORT = process.env["PORT"] || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Routes
app.get("/", (_req: Request, res: Response): void => {
	res.send("API is running...");
});

// Start server
app.listen(PORT, (): void => {
	console.log(`Server running on port ${PORT}`);
});
