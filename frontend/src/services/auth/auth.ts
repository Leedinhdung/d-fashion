import axiosClient from "../../configs/axiosClient";
import { ILoginData, IRegisterData, IUserProfile } from "../../types/user";
import { authUri } from "../uri/auth/auth";

export const authApi = {
	register: async (data: IRegisterData): Promise<IRegisterData> => {
		return axiosClient.post(authUri.REGISTER, data);
	},
	login: async (data: ILoginData): Promise<IUserProfile> => {
		return axiosClient.post(authUri.LOGIN, data);
	},
	logout: async (): Promise<IUserProfile> => {
		return axiosClient.post(authUri.LOGOUT);
	},
	refreshToken: async (refreshToken: string): Promise<IUserProfile> => {
		return axiosClient.post(authUri.REFRESH_TOKEN, {
			refresh_token: refreshToken,
		});
	},
};
