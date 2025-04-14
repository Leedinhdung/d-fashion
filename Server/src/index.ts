import dotenv from "dotenv";
import express, { Request, Response } from "express";
import connectDB from "./config/connectDB";
import router from "./routes";
import cors from "cors";
const port = 8080;

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api", router);
connectDB();
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
