import express from "express";
import category from "./admin/category";
const router = express.Router();

//Admin
category(router);
export default router;
