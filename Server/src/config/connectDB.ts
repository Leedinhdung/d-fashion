import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log("Kết nối thành công");
	} catch (error) {
		console.log("Connection error:" + error);
	}
};
export default connectDB;
