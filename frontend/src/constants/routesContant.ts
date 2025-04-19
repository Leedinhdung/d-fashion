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
import Products from "../pages/clients/Products";
import CategoryProducts from "../pages/clients/CategoryProducts";
import CategoriesTrash from "../pages/admin/categories/CategoriesTrash";
import ProductForm from "../pages/admin/products/ProductForm";
import ProductsTrash from "../pages/admin/products/ProductsTrash";
import Auth from "../pages/clients/Auth";

export const clientRoutes = [
	{ path: routes.register, layout: ClientLayout, element: Auth },
	{ path: routes.login, layout: ClientLayout, element: Auth },
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
	{
		path: routes.categoriesTrash,
		layout: DashboardLayout,
		element: CategoriesTrash,
	},
	{ path: routes.products, layout: DashboardLayout, element: ProductsList },
	{ path: routes.addProduct, layout: DashboardLayout, element: ProductForm },
	{ path: routes.editProduct, layout: DashboardLayout, element: ProductForm },
	{
		path: routes.productsTrash,
		layout: DashboardLayout,
		element: ProductsTrash,
	},
];
