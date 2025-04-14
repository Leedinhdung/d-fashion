import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
	name: { type: String, require: true },
	description: {
		type: String,
		require: true,
	},
});
