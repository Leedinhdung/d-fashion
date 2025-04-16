import express from "express";
import category from "./admin/category";
import product from "./admin/product";
const router = express.Router();

//Admin
category(router);
product(router);
export default router;
