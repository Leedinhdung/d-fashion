export const categories = [
	{
		id: "men",
		name: "Men's Collection",
		image:
			"https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		description:
			"Discover our latest men's clothing collection featuring stylish and comfortable pieces for every occasion.",
		productCount: 42,
	},
	{
		id: "women",
		name: "Women's Collection",
		image:
			"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		description:
			"Explore our women's collection with trendy and elegant designs that will elevate your wardrobe.",
		productCount: 56,
	},
	{
		id: "kids",
		name: "Kids' Collection",
		image:
			"https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		description: "Adorable and comfortable clothing for kids of all ages.",
		productCount: 28,
	},
	{
		id: "accessories",
		name: "Accessories",
		image:
			"https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
		description: "Complete your look with our stylish accessories collection.",
		productCount: 35,
	},
];
export const getCategoryById = (id) => {
	return categories.find((category) => category.id === id) || null;
};
