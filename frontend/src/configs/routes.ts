const routes = {
	//Client
	home: "/",
	contact: "/lien-he",
	blog: "/bai-viet",
	detailProduct: "/chi-tiet/:slug",
	allProducts: "/tat-ca-san-pham",
	productByCate:"danh-muc/:slug",
	//Admin
	dashboard: "/quan-tri",
	//Category
	categories: "/quan-tri/danh-muc",
	categoriesTrash: "/quan-tri/danh-muc/thung-rac",
	products: "/quan-tri/san-pham",
	productDetail: "quan-tri/san-pham/:slug",
	orders: "/quan-tri/don-hang",
	guest: "/quan-tri/khach-hang",
};

export default routes;
