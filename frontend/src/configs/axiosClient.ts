import axios from "axios";
import { backendUrl } from "./baseUrl";

const axiosClient = axios.create({
	baseURL: backendUrl,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.log("Error in request interceptor:", error);
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	(res) => res.data.data,
	async (error) => {
		const originalRequest = error.config;
		
		// Xử lý refresh token khi token hết hạn (lỗi 401)
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			
			try {
				const refreshToken = localStorage.getItem("refreshToken");
				const response = await axios.post(`${backendUrl}/refresh-token`, { refresh_token: refreshToken });
				
				const { access_token, refresh_token } = response.data.data;
				localStorage.setItem("access_token", access_token);
				localStorage.setItem("refresh_token", refresh_token);
				
				// Cập nhật Authorization header
				originalRequest.headers.Authorization = `Bearer ${access_token}`;
				
				// Gửi lại request ban đầu với token mới
				return axiosClient(originalRequest);
			} catch (refreshError) {
				// Xóa token nếu refresh thất bại
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				localStorage.removeItem("user_data");
				localStorage.removeItem("user_profile");
				
				// Chuyển hướng về trang đăng nhập
				window.location.href = "/dang-nhap";
				
				return Promise.reject(refreshError);
			}
		}
		
		console.log("Error in response interceptor: ", error);
		return Promise.reject(error);
	}
);

export default axiosClient;