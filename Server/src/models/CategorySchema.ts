import mongoose from "mongoose";
const CategoryModel = new mongoose.Schema(
	{
		name: { type: String, require: true, unique: true },
		slug: { type: String, require: true, unique: true },

		productId: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "products",
			},
		],
		isDeleted: { type: Boolean, default: false },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.model("category", CategoryModel);
