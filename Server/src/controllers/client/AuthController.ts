import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { handleError } from "../../utils/handleError";
import bcryptjs from "bcryptjs";
import UserSchema from "../../models/UserSchema";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const checkEmail = await UserSchema.findOne({ email });
		if (checkEmail) {
			res.status(409).send({
				message: "Email đã tồn tại",
			});
		}
		const passwordHash = await bcryptjs.hash(password, 10);
		if (!passwordHash) {
			res.status(409).send({
				message: "Đăng ký thất bại",
			});
		}
		const data = await UserSchema.create({
			...req.body,
			password: passwordHash,
		});
		if (data) {
			res.status(201).send({
				message: "Đăng ký thành công",
				data,
			});
		}
	} catch (error) {
		handleError(error, res, "Đăng ký thất bại");
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const userExist = await UserSchema.findOne({ email });
		if (!userExist) {
			res.status(400).send({ message: "Tài khoản không tồn tại" });
		}
		if (!(await bcryptjs.compare(password, userExist.password))) {
			res.status(400).send({ message: "Mật khẩu không khớp" });
		}

		if (!process.env.JWT_TOKEN) {
			throw new Error("JWT_TOKEN is not defined");
		}

		const accessToken = jwt.sign({ id: userExist._id }, process.env.JWT_TOKEN, {
			expiresIn: "10s",
		});

		const refreshToken = jwt.sign(
			{ id: userExist._id },
			process.env.JWT_TOKEN,
			{
				expiresIn: "60s",
			}
		);

		// Lưu refreshToken vào database
		userExist.refreshToken = refreshToken;
		await userExist.save();

		const { password: _, ...userData } = userExist.toObject();
		const profile = {
			id: userExist._id,
			phone: userExist.phone || "",
			address: userExist.address || "",
		};

		res.status(201).send({
			message: "Đăng nhập thành công",
			data: {
				access_token: accessToken,
				refresh_token: refreshToken,
				user: userData,
				profile: profile,
			},
		});
	} catch (error) {
		handleError(error, res, "Lỗi đăng nhập");
	}
};

export const refreshToken = async (req: Request, res: Response) => {
	try {
		const { refresh_token } = req.body;
		if (!refresh_token) {
			res.status(400).send({ message: "Refresh token không được cung cấp" });
		}

		if (!process.env.JWT_TOKEN) {
			throw new Error("JWT_TOKEN không được định nghĩa");
		}

		// Xác minh refresh token
		const decoded = jwt.verify(refresh_token, process.env.JWT_TOKEN) as {
			id: string;
		};

		const user = await UserSchema.findById(decoded.id);

		if (!user || user.refreshToken !== refresh_token) {
			res.status(401).send({ message: "Refresh token không hợp lệ" });
		}

		// Tạo access token mới
		const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
			expiresIn: "10s",
		});

		// Tạo refresh token mới (tùy chọn)
		const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
			expiresIn: "60s",
		});

		// Cập nhật refresh token mới vào database
		user.refreshToken = newRefreshToken;
		await user.save();

		res.status(200).send({
			message: "Làm mới token thành công",
			data: {
				access_token: newAccessToken,
				refresh_token: newRefreshToken,
			},
		});
	} catch (error) {
		handleError(error, res, "Lỗi làm mới token");
	}
};

