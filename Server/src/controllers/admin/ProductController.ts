import { Request, Response } from "express";
import { createSlug } from "../../utils/createSlug";
import ProductSchema from "../../models/ProductSchema";
import { handleError } from "../../utils/handleError";
import { ICategory } from "../../types/category";
import { IProduct } from "../../types/product";
// Tạo sản phẩm
export const createProduct = async (req: Request, res: Response) => {
	try {
		const { data } = req.body || {};
		const product = new ProductSchema({
			...data,
			slug: createSlug(data.name),
		});
		await product.save();

		res.status(201).json({
			message: "Tạo sản phẩm thành công",
			data: product,
		});
	} catch (error) {
		handleError(error, res, "Lỗi tạo sản phẩm");
	}
};

// Lấy danh sách sản phẩm
export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const data = await ProductSchema.find({ isDeleted: false })
			.populate<{ categoryId: ICategory }>("categoryId", "name")
			.sort({ create: -1 });
		const transformedProducts = data.map((product) => ({
			_id: product._id,
			name: product.name,
			category: product.categoryId ? product.categoryId?.name : null,
			price: product.price,
			status: product.status,
			slug: product.slug,
			images: product.images,
			variations: product.variations,
			variants: product.variants,
		}));

		res.status(200).send({
			message: "Lấy danh sách thành công",
			data: transformedProducts,
		});
	} catch (error) {
		handleError(error, res, "Lỗi");
	}
};

// Lấy chi tiết sản phẩm
export const getProductById = async (req: Request, res: Response) => {
	try {
		const product = await ProductSchema.findById(req.params.id)
			.populate<{ categoryId: ICategory }>("categoryId", "name")
			.lean();
		if (!product) {
			res.status(404).json({ message: "Sản phẩm không tồn tại" });
		}
		const transformedProduct: IProduct = {
			_id: product._id.toString(),
			name: product.name,
			category: product.categoryId ? product.categoryId.name : null,
			price: product.price,
			status: product.status,
			slug: product.slug,
			images: product.images,
			description: product.description,
			variations: product.variations,
			variants: product.variants,
		};

		res.status(200).json({
			message: "Lấy sản phẩm thành công",
			data: transformedProduct,
		});
	} catch (error) {
		handleError(error, res, "Lỗi lấy sản phẩm");
	}
};
export const updateProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await ProductSchema.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(200).json({
			message: "Cập nhật sản phẩm thành công",
			data: product,
		});
	} catch (error) {
		handleError(error, res, "Lỗi cập nhật sản phẩm");
	}
};
export const softDeleteProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await ProductSchema.findByIdAndUpdate(
			id,
			{ isDeleted: true },
			{ new: true }
		);
		res.status(200).send({
			message: "Xóa sản phẩm thành công",
			data: product,
		});
	} catch (error) {
		handleError(error, res, "Xóa danh mục thất bại");
	}
};
export const restoreProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await ProductSchema.findByIdAndUpdate(
			id,
			{ isDeleted: false },
			{ new: true }
		);
		res.status(200).send({
			message: "Khôi phục thành công",
			data: product,
		});
	} catch (error) {
		handleError(error, res, "Khôi phục danh mục thất bại");
	}
};
export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await ProductSchema.findByIdAndDelete(id, { new: true });
		res.status(200).send({
			message: "Xóa thành công",
			data: product,
		});
	} catch (error) {
		handleError(error, res, "Xóa thất bại");
	}
};
export const getAllProductsTrash = async (
	req: Request,
	res: Response
) => {
	try {
		const products = await ProductSchema.find({ isDeleted: true });
		res.status(200).send({
			message: "Lấy danh mục thành công",
			data: products,
		});
	} catch (error) {
		handleError(error, res, "Lấy danh sách thất bại");
	}
};
