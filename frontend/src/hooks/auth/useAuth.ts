import {
	useMutation,
} from "@tanstack/react-query";
import { ILoginData, IRegisterData } from "../../types/user";
import { authApi } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";
import routes from "../../configs/routes";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/authStore";
import {
	setAccessToken,
	setRefreshToken,
} from "../../lib/common";
import { useEffect } from "react";
export const useRegister = () => {
	return useMutation({
		mutationFn: (data: IRegisterData) => authApi.register(data),
	});
};
export const useLogin = () => {
	const navigate = useNavigate();
	const setUser = useUserStore((state) => state.setUser);
	const setProfile = useUserStore((state) => state.setProfile);
	return useMutation({
		mutationFn: (data: ILoginData) => authApi.login(data),
		onSuccess: async (response) => {
			setUser(response.user);
			setProfile(response.profile);
			setAccessToken(response.access_token);
			setRefreshToken(response.refresh_token);
			navigate(routes.home);
			toast.success("Đăng nhập thành công");
		},
	});
}
export const useGetUserProfile = () => {
	const user = useUserStore((state) => state.user);
	const profile = useUserStore((state) => state.profile);
	const setUser = useUserStore((state) => state.setUser);
	const setProfile = useUserStore((state) => state.setProfile);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		const storedProfile = localStorage.getItem("profile");

		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}

		if (storedProfile) {
			setProfile(JSON.parse(storedProfile));
		}
	}, [setUser, setProfile]);

	return { user, profile };
};
export const useRefreshToken = () => {
	const navigate = useNavigate();
	const setUser = useUserStore((state) => state.setUser);
	const setProfile = useUserStore((state) => state.setProfile);

	const refreshToken = async () => {
		try {
			const currentRefreshToken = localStorage.getItem("refresh_token");
			if (!currentRefreshToken) {
				throw new Error("Không có refresh token");
			}

			const response = await authApi.refreshToken(currentRefreshToken);

			setAccessToken(response.access_token);
			setRefreshToken(response.refresh_token);

			return response.access_token;
		} catch (error) {
			// Xóa token và thông tin người dùng
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			localStorage.removeItem("user_data");
			localStorage.removeItem("user_profile");

			// Reset store state
			setUser(null);
			setProfile(null);

			// Chuyển hướng về trang đăng nhập
			navigate(routes.login);
			toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");

			throw error;
		}
	};

	return { refreshToken };
};

export const useCheckAuth = () => {
	const { user } = useGetUserProfile();
	const { refreshToken } = useRefreshToken();
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem("access_token");

			if (!token) {
				navigate(routes.login);
				return;
			}

			// Nếu có token nhưng không có thông tin user, thử refresh token
			if (!user && token) {
				try {
					await refreshToken();
				} catch (error) {
					navigate(routes.login);
				}
			}
		};

		checkAuth();
	}, [navigate, refreshToken, user]);

	return { isAuthenticated: !!user };
};
