import express from "express";
import {
	login,
	refreshToken,
	register,
} from "../../controllers/client/AuthController";

export default (router: express.Router) => {
	router.post("/dang-ky", register);
	router.post("/dang-nhap", login);
	router.post("/refresh-token", refreshToken);
};
