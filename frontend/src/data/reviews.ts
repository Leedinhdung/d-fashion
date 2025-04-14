export interface Review {
	id: number;
	productId: number;
	userId: string;
	userName: string;
	rating: number;
	comment: string;
	date: string;
	likes: number;
	helpful: number;
	images?: string[];
}
export const reviews: Review[] = [
	{
		id: 1,
		productId: 1,
		userId: "user1",
		userName: "John Smith",
		rating: 5,
		comment:
			"Great quality t-shirt! The fabric is soft and comfortable. Fits perfectly and washes well. Highly recommend!",
		date: "2023-11-15",
		likes: 12,
		helpful: 8,
		images: [
			"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
		],
	},
	{
		id: 2,
		productId: 1,
		userId: "user2",
		userName: "Emma Wilson",
		rating: 4,
		comment:
			"Nice shirt, good quality for the price. The only reason for 4 stars is that it runs slightly large.",
		date: "2023-11-10",
		likes: 5,
		helpful: 3,
	},
	{
		id: 3,
		productId: 1,
		userId: "user3",
		userName: "Michael Brown",
		rating: 5,
		comment: "Perfect basic white tee. Already ordered another one!",
		date: "2023-11-05",
		likes: 8,
		helpful: 6,
	},
];
export const getProductReviews = (productId: number) => {
	return reviews.filter((review) => review.productId === productId);
};
export const getAverageRating = (productId: number) => {
	const productReviews = getProductReviews(productId);
	if (productReviews.length === 0) return 0;
	const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
	return sum / productReviews.length;
};
export const getRatingCounts = (productId: number) => {
	const productReviews = getProductReviews(productId);
	const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
	productReviews.forEach((review) => {
		counts[review.rating]++;
	});
	return counts;
};
