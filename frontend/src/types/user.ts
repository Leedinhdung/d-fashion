export interface IUser {
	email: string;
	name: string;
	address: string;
	password: string;
	phone: string;
	avatar: string;
	role: "member" | "admin";
}
export interface IProfile {
	id: number;
	phone: string;
	address: string;
}
export interface ILoginData {
	email: string;
	password: string;
	token: string;
}
export interface IUserProfile {
	access_token: string;
	refresh_token: string;
	user: IUser;
	profile: IProfile;
}
export interface IRegisterData {
	data: {
		name: string;
		email: string;
		password: string;
		password_confirmation: string;
	};
	token: string;
}
