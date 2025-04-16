import {
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
} from "@tanstack/react-query";
import { ProductFormData } from "../../schemas/product.schema";
import { productApi } from "../../services/product/product";
import { IProduct } from "../../types/product";

export const useGetAllProducts = (
	options?: Omit<UseQueryOptions<IProduct[]>, "queryKey" | "queryFn">
) => {
	return useQuery<IProduct[]>({
		...options,
		queryKey: ["allProducts"],
		queryFn: productApi.getAllProducts,
	});
};
export const useGetProductsTrash = (
	options?: Omit<UseQueryOptions<IProduct[]>, "queryKey" | "queryFn">
) => {
	return useQuery<IProduct[]>({
		...options,
		queryKey: ["trash-products"],
		queryFn: productApi.getAllProductsTrash,
	});
};
export const useGetProductById = (
	id: string,
	options?: Omit<UseQueryOptions<IProduct>, "queryKey" | "queryFn">
) => {
	return useQuery<IProduct>({
		...options,
		enabled: !!id,
		queryKey: ["allProducts", id],
		queryFn: () => productApi.getProductById(id),
	});
};
export const useCreateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data: ProductFormData) => {
			return productApi.createProduct(data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allProducts"] });
		},
	});
};
export const useUpdateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation<IProduct, Error, [string, IProduct]>({
		mutationFn: async ([id, data]) => {
			return productApi.updateProductById(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allProducts"] });
		},
	});
};
export const useSoftDeleteProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return productApi.softDeleteProduct(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allProducts"] });
		},
	});
};
export const useRestoreProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return productApi.restoreProduct(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["trash-products"] });
			queryClient.invalidateQueries({ queryKey: ["allProducts"] });
		},
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			return productApi.deleteProduct(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["trash-products"] });
			queryClient.invalidateQueries({ queryKey: ["allProducts"] });
		},
	});
};
