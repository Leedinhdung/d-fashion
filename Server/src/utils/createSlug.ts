export const createSlug = (str: string) => {
	return str
		.toLowerCase()
		.normalize("NFD") // Chuẩn hóa tiếng Việt
		.replace(/[\u0300-\u036f]/g, "") // Xóa dấu
		.replace(/[^a-z0-9\s-]/g, "") // Xóa ký tự đặc biệt
		.trim()
		.replace(/\s+/g, "-"); // Thay khoảng trắng bằng dấu gạch ngang
};
