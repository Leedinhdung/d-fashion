const routes = {
	//Client
	home: "/",
	contact: "/lien-he",
	blog: "/bai-viet",
	detailProduct: "/chi-tiet/:slug",
	allProducts: "/tat-ca-san-pham",
	productByCate: "danh-muc/:slug",
	//Admin
	dashboard: "/quan-tri",
	//Category
	categories: "/quan-tri/danh-muc",
	categoriesTrash: "/quan-tri/danh-muc/thung-rac",

	products: "/quan-tri/san-pham",
	addProduct: "/quan-tri/san-pham/them-moi",
	editProduct: "/quan-tri/san-pham/chinh-sua/:id",
	productsTrash: "/quan-tri/san-pham/thung-rac",
	// productDetail: "quan-tri/san-pham/:slug",

	orders: "/quan-tri/don-hang",
	guest: "/quan-tri/khach-hang",
};

export default routes;
