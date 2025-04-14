import { ICategory } from "./../../types/category";
import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";
import { categoryApi } from "../../services/category/category";

export const useGetAllCategories = (
	options?: Omit<UseQueryOptions<ICategory[]>, "queryKey" | "queryFn">
) => {
	return useQuery<ICategory[]>({
		...options,
		queryKey: ["allCategories"],
		queryFn: categoryApi.getAllCategories,
	});
};
export const useGetCategoriesTrash = (
	options?: Omit<UseQueryOptions<ICategory[]>, "queryKey" | "queryFn">
) => {
	return useQuery<ICategory[]>({
		...options,
		queryKey: ["trash-categories"],
		queryFn: categoryApi.getAllCategoriesTrash,
	});
};
export const useCreateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: ICategory) => {
			return categoryApi.createCategory(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allCategories"] });
		},
	});
};

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation<ICategory, Error, [string, ICategory]>({
		mutationFn: async ([id, data]) => {
			return categoryApi.updateCategoryById(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allCategories"] });
		},
	});
};

export const useSoftDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return categoryApi.softDeleteCategory(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allCategories"] });
		},
	});
};
export const useRestoreCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return categoryApi.restoreCategory(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["trash-categories"] });
		},
	});
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return categoryApi.deleteCategory(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["trash-categories"] });
		},
	});
};
