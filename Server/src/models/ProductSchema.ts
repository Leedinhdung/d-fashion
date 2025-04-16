import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
	url: { type: String, required: true },
	fileName: { type: String, required: true },
});

const VariationSchema = new mongoose.Schema({
	id: { type: String, required: true },
	name: { type: String, required: true },
	options: [{ type: String, required: true }],
});

const VariantSchema = new mongoose.Schema({
	id: { type: String, required: true },
	combination: { type: Map, of: String, required: true },
	price: { type: String, required: true },
	stock: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		slug: { type: String, unique: true, required: true },
		description: { type: String },
		categoryId: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: "category",
		},
		price: { type: String, required: true },
		status: { type: String, required: true },
		images: [ImageSchema],
		variations: [VariationSchema],
		variants: [VariantSchema],
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
