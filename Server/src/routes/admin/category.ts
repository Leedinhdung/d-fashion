import express from "express";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getAllCategoriesTrash,
	restoreCategory,
	softDeleteCategory,
	updateCategory,
} from "../../controllers/admin/CategoryController";

export default (router: express.Router) => {
	router.get("/quan-tri/danh-muc", getAllCategories);
	router.get("/quan-tri/danh-muc/thung-rac", getAllCategoriesTrash);
	router.post("/quan-tri/danh-muc", createCategory);
	router.put("/quan-tri/danh-muc/:id", updateCategory);
	router.put("/quan-tri/danh-muc/xoa/:id", softDeleteCategory);
	router.put("/quan-tri/danh-muc/khoi-phuc/:id", restoreCategory);
	router.delete("/quan-tri/danh-muc/xoa-vinh-vien/:id", deleteCategory);
};
