import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getAllProductsTrash,
	getProductById,
	restoreProduct,
	softDeleteProduct,
	updateProduct,
} from "../../controllers/admin/ProductController";

export default (router: express.Router) => {
	router.get("/quan-tri/san-pham", getAllProducts);
	router.get("/quan-tri/san-pham/:id/sua", getProductById);
	router.get("/quan-tri/san-pham/thung-rac", getAllProductsTrash);
	router.post("/quan-tri/san-pham", createProduct);
	router.put("/quan-tri/san-pham/:id", updateProduct);
	router.put("/quan-tri/san-pham/xoa/:id", softDeleteProduct);
	router.put("/quan-tri/san-pham/khoi-phuc/:id", restoreProduct);
	router.delete("/quan-tri/san-pham/xoa-vinh-vien/:id", deleteProduct);
};
