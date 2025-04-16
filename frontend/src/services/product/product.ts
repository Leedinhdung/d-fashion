import axiosClient from "../../configs/axiosClient";
import { ProductFormData } from "../../schemas/product.schema";
import { ICategory } from "../../types/category";
import { IProduct } from "../../types/product";
import { ProductUri } from "../uri/product/product";

export const productApi = {
	getAllProducts: async (): Promise<IProduct[]> => {
		return axiosClient.get(ProductUri.GET_ALL_PRODUCTS);
	},
	getProductById: async (id: string): Promise<IProduct> => {
		return axiosClient.get(ProductUri.GET_PRODUCT_BY_ID(id));
	},
	getAllProductsTrash: async (): Promise<IProduct[]> => {
		return axiosClient.get(ProductUri.GET_ALL_PRODUCTS_TRASH);
	},
	createProduct: async (data: ProductFormData): Promise<ICategory> => {
		return axiosClient.post(ProductUri.ADD_PRODUCT, data);
	},
	updateProductById: async (
		id: string,
		data: IProduct
	): Promise<IProduct> => {
		return axiosClient.put(ProductUri.UPDATE_PRODUCT(id), data);
	},
	softDeleteProduct: async (id: string) => {
		return axiosClient.put(ProductUri.SOFT_DELETE(id));
	},
	restoreProduct: async (id: string) => {
		return axiosClient.put(ProductUri.RESTORE(id));
	},
	deleteProduct: async (id: string) => {
		return axiosClient.delete(ProductUri.DELETE(id));
	},
};
