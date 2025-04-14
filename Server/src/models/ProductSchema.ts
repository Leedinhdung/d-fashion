import mongoose from "mongoose";
import { ref } from "process";

const ProductModel = new mongoose.Schema({
	CategoryId: { type: mongoose.Schema.ObjectId, ref: "category" },
	name: { type: String, require: true },
	price: { type: Number, require: true },
	stock: { type: Number, require: true },
	status: { type: String, require: true, enum: ["instock", "outofstock"] },
	description: {
		type: String,
		require: true,
	},
	image: { type: String, require: true },
	variations: [
		{
			name: { type: String, require: true },
			options: { type: String, require: true },
		},
	],
});

export default mongoose.model("product", ProductModel);
