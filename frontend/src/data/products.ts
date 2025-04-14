export const products = [
	{
		id: 1,
		name: "Classic White T-Shirt",
		price: 24.99,
		image:
			"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		category: "Men",
		categoryId: "men",
		description:
			"Essential white cotton t-shirt with a comfortable fit and classic design.",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["White", "Black", "Gray"],
		isNew: true,
	},
	{
		id: 2,
		name: "Slim Fit Jeans",
		price: 59.99,
		image:
			"https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		category: "Men",
		categoryId: "men",
		description: "Modern slim fit jeans with a slight stretch for comfort.",
		sizes: ["30", "32", "34", "36", "38"],
		colors: ["Blue", "Black", "Gray"],
	},
	{
		id: 3,
		name: "Floral Summer Dress",
		price: 49.99,
		originalPrice: 79.99,
		image:
			"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		category: "Women",
		categoryId: "women",
		description: "Lightweight floral dress perfect for summer days.",
		sizes: ["XS", "S", "M", "L"],
		colors: ["Blue", "Pink", "Yellow"],
		isSale: true,
	},
	{
		id: 4,
		name: "High-Waisted Shorts",
		price: 34.99,
		image:
			"https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		category: "Women",
		categoryId: "women",
		description: "Stylish high-waisted shorts with a comfortable fit.",
		sizes: ["XS", "S", "M", "L", "XL"],
		colors: ["Blue", "Black", "White"],
	},
	{
		id: 5,
		name: "Kids Dinosaur T-Shirt",
		price: 19.99,
		image:
			"https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		category: "Kids",
		categoryId: "kids",
		description: "Fun dinosaur print t-shirt for kids.",
		sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
		colors: ["Green", "Blue", "Red"],
		isNew: true,
	},
	{
		id: 6,
		name: "Denim Overalls",
		price: 39.99,
		image:
			"https://images.unsplash.com/photo-1544923408-75c5cef46f14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		category: "Kids",
		categoryId: "kids",
		description: "Classic denim overalls for kids.",
		sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
		colors: ["Blue", "Pink"],
	},
	{
		id: 7,
		name: "Leather Watch",
		price: 89.99,
		originalPrice: 119.99,
		image:
			"https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		category: "Accessories",
		categoryId: "accessories",
		description: "Classic leather watch with a stainless steel case.",
		colors: ["Brown", "Black"],
		isSale: true,
	},
	{
		id: 8,
		name: "Canvas Tote Bag",
		price: 29.99,
		image:
			"https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		category: "Accessories",
		categoryId: "accessories",
		description: "Spacious canvas tote bag for everyday use.",
		colors: ["Natural", "Black", "Navy"],
	},
];
export const getProductById = (id) => {
	return products.find((product) => product.id === Number(id)) || null;
};
export const getProductsByCategory = (categoryId: string) => {
	return products.filter((product) => product.categoryId === categoryId);
};
export const getRelatedProducts = (
	productId: string,
	categoryId: string,
	limit = 4
) => {
	return products
		.filter(
			(product) =>
				product.categoryId === categoryId && product.id !== Number(productId)
		)
		.slice(0, limit);
};
