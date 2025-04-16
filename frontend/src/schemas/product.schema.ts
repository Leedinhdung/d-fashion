import { z } from "zod";

export const productSchema = z.object({
	name: z.string().min(1, "Product name is required"),
	description: z.string().optional(),
	category: z.string().min(1, "Category is required"),
	price: z.string().min(1, "Price is required"),
	stock: z.string().min(1, "Stock is required"),
	status: z.string(),
	images: z.array(z.string()),
	variations: z.array(
		z.object({
			id: z.string(),
			name: z.string().min(1, "Variation name is required"),
			options: z.array(z.string().min(1, "Option is required")),
		})
	),
	variants: z.array(
		z.object({
			id: z.string(),
			combination: z.record(z.string()),
			price: z.string(),
			stock: z.number(),
		})
	),
});

export type ProductFormData = z.infer<typeof productSchema>;
