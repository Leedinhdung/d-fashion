import express from "express";
export const handleError = (
	error: any,
	res: express.Response,
	message: string = "Đã xảy ra lỗi"
) => {
	console.error(message, error);
	res.status(500).send({
		message,
		error: error instanceof Error ? error.message : "Lỗi không xác định",
	});
};
