import express from "express";
import category from "./admin/category";
import product from "./admin/product";
import auth from "./auth/auth";
const router = express.Router();

//Admin
category(router);
product(router);
auth(router);
export default router;
