import express from "express";
import CategorySchema from "../../models/CategorySchema";
import { handleError } from "../../utils/handleError";
import { createSlug } from "../../utils/createSlug";

export const createCategory = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { name } = req.body || {};

		const existingCategory = await CategorySchema.findOne({ name });
		if (existingCategory) {
			res.status(409).json({
				message: "Danh mục đã tồn tại",
			});
		}
		const slug = createSlug(name);
		const category = new CategorySchema({ name, slug });
		await category.save();

		res.status(201).json({
			message: "Tạo danh mục thành công",
			data: {
				_id: category._id,
				name: category.name,
				slug: category.slug,
			},
		});
	} catch (error) {
		handleError(error, res, "Lỗi tạo danh mục");
	}
};
export const updateCategory = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const updateData = { ...req.body };
		if (name) {
			updateData.slug = createSlug(name);
		}
		const category = await CategorySchema.findByIdAndUpdate(id, updateData, {
			new: true,
		});
		res.status(200).send({
			message: "Cập nhật thành công",
			data: category,
		});
	} catch (error) {
		handleError(error, res, "Lỗi cập nhật danh mục");
	}
};

export const getAllCategories = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const category = await CategorySchema.find({ isDeleted: false });
		res.status(200).send({
			message: "Lấy danh mục thành công",
			data: category,
		});
	} catch (error) {
		handleError(error, res, "Lấy danh sách thất bại");
	}
};
export const getAllCategoriesTrash = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const category = await CategorySchema.find({ isDeleted: false });
		res.status(200).send({
			message: "Lấy danh mục thành công",
			data: category,
		});
	} catch (error) {
		handleError(error, res, "Lấy danh sách thất bại");
	}
};

export const softDeleteCategory = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const category = await CategorySchema.findByIdAndUpdate(
			id,
			{ isDeleted: true },
			{ new: true }
		);
		res.status(200).send({
			message: "Xóa danh mục thành công",
			data: category,
		});
	} catch (error) {
		handleError(error, res, "Xóa danh mục thất bại");
	}
};
export const restoreCategory = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const category = await CategorySchema.findByIdAndUpdate(
			id,
			{ isDeleted: false },
			{ new: true }
		);
		res.status(200).send({
			message: "Khôi phục thành công",
			data: category,
		});
	} catch (error) {
		handleError(error, res, "Khôi phục danh mục thất bại");
	}
};
export const deleteCategory = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const category = await CategorySchema.findByIdAndDelete(id, { new: true });
		res.status(200).send({
			message: "Xóa thành công",
			data: category,
		});
	} catch (error) {
		handleError(error, res, "Xóa thất bại");
	}
};