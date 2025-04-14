import DashboardLayout from "../components/admin/layout/DashBoardLayout";
import ClientLayout from "../components/clients/layout/ClientLayout";
import routes from "../configs/routes";
import CategoriesList from "../pages/admin/categories/CategoriesList";
import Dashboard from "../pages/admin/DashBoard";
import ProductsList from "../pages/admin/products/ProductsList";
import Blog from "../pages/clients/Blog";
import Contact from "../pages/clients/Contact";
import Home from "../pages/clients/Home";
import ProductDetail from "../pages/clients/ProductDetail";
import DetailProduct from "../pages/admin/products/ProductDetail";
import Products from "../pages/clients/Products";
import CategoryProducts from "../pages/clients/CategoryProducts";

export const clientRoutes = [
	{ path: routes.home, layout: ClientLayout, element: Home },
	{ path: routes.blog, layout: ClientLayout, element: Blog },
	{ path: routes.detailProduct, layout: ClientLayout, element: ProductDetail },
	{ path: routes.allProducts, layout: ClientLayout, element: Products },
	{ path: routes.contact, layout: ClientLayout, element: Contact },
	{
		path: routes.productByCate,
		layout: ClientLayout,
		element: CategoryProducts,
	},
	{
		path: routes.blog,
		layout: ClientLayout,
		element: Blog,
	},

];
export const adminRoutes = [
	{ path: routes.dashboard, layout: DashboardLayout, element: Dashboard },
	{ path: routes.categories, layout: DashboardLayout, element: CategoriesList },
	{ path: routes.products, layout: DashboardLayout, element: ProductsList },
	{
		path: routes.productDetail,
		layout: DashboardLayout,
		element: DetailProduct,
	},
];
