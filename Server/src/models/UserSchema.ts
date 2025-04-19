import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		email: { type: String, require: true, unique: true },
		name: { type: String },
		password: { type: String, require: true },
		phone: { type: String },
		avatar: { type: String, default: "" },
		address: { type: String },
		role: { type: String, enum: ["member", "admin"], default: "member" },
		refreshToken: { type: String, default: null },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);
export default mongoose.model("users", UserSchema);
