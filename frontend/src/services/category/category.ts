import axiosClient from "../../configs/axiosClient";
import { ICategory } from "../../types/category";
import { categoryUri } from "../uri/category/category";

export const categoryApi = {
	getAllCategories: async (): Promise<ICategory[]> => {
		return axiosClient.get(categoryUri.GET_ALL_CATEGORIES);
	},
	getAllCategoriesTrash: async (): Promise<ICategory[]> => {
		return axiosClient.get(categoryUri.GET_ALL_CATEGORIES_TRASH);
	},
	createCategory: async (data: ICategory): Promise<ICategory> => {
		return axiosClient.post(categoryUri.ADD_CATEGORY, data);
	},
	updateCategoryById: async (
		id: string,
		data: ICategory
	): Promise<ICategory> => {
		return axiosClient.put(categoryUri.UPDATE_CATEGORY(id), data);
	},
	softDeleteCategory: async (id: string) => {
		return axiosClient.put(categoryUri.SOFT_DELETE(id));
	},
	restoreCategory: async (id: string) => {
		return axiosClient.put(categoryUri.RESTORE(id));
	},
	deleteCategory: async (id: string) => {
		return axiosClient.delete(categoryUri.DELETE(id));
	},
};
