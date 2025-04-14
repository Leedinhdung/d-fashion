export const posts = [
	{
		id: 1,
		title: "Summer Fashion Trends You Need to Know",
		excerpt: "Discover the hottest fashion trends for this summer season.",
		content:
			"Summer is here, and it's time to refresh your wardrobe with the latest trends. This season is all about bold colors, floral patterns, and sustainable fashion. From oversized shirts to mini skirts, we've compiled a list of must-have items that will keep you stylish and comfortable throughout the summer months.",
		image:
			"https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
		author: "Emma Johnson",
		date: "June 15, 2023",
		category: "Fashion Trends",
	},
	{
		id: 2,
		title: "How to Build a Sustainable Wardrobe",
		excerpt: "Tips for creating a more eco-friendly and sustainable wardrobe.",
		content:
			"Fast fashion has a significant impact on our environment. In this article, we explore practical ways to build a more sustainable wardrobe without sacrificing style. Learn about ethical brands, quality materials, and how to extend the life of your favorite clothing items through proper care and creative styling.",
		image:
			"https://images.unsplash.com/photo-1542340916-951bb72c8f74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
		author: "Michael Chen",
		date: "May 22, 2023",
		category: "Sustainable Fashion",
	},
	{
		id: 3,
		title: "The History of Denim: From Workwear to High Fashion",
		excerpt: "Exploring the journey of denim throughout fashion history.",
		content:
			"Denim has come a long way from its humble beginnings as durable workwear to becoming a staple in high fashion. This article takes you through the fascinating evolution of denim, highlighting key moments and innovations that transformed this fabric into the versatile material we know and love today.",
		image:
			"https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
		author: "Sarah Williams",
		date: "April 10, 2023",
		category: "Fashion History",
	},
	{
		id: 4,
		title: "Fashion Tips for Different Body Types",
		excerpt: "Learn how to dress for your unique body shape.",
		content:
			"Understanding your body type is the first step to creating a wardrobe that makes you feel confident and comfortable. In this comprehensive guide, we provide styling tips for different body shapes, helping you emphasize your best features and create balanced, flattering looks for any occasion.",
		image:
			"https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
		author: "David Rodriguez",
		date: "March 5, 2023",
		category: "Style Tips",
	},
];
export const getPostById = (id) => {
	return posts.find((post) => post.id === Number(id)) || null;
};
