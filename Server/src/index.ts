import dotenv from "dotenv";
import express, { Request, Response } from "express";
import connectDB from "./config/connectDB";
const port = 8080;

const app = express();
dotenv.config();
connectDB();
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
