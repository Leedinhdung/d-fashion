import { create } from "zustand";
import { IProfile, IUser } from "../types/user";

interface UserState {
	user: IUser | null;
	profile: IProfile | null;
	setUser: (user: IUser) => void;
	setProfile: (profile: IProfile) => void;
	clearUser: () => void;
	clearProfile: () => void;
	clearUserAndProfile: () => void;
}

export const useUserStore = create<UserState>((set) => ({
	user: JSON.parse(localStorage.getItem("user_data") || "null"),
	profile: JSON.parse(localStorage.getItem("user_profile") || "null"),
	setUser: (user) => {
		set({ user });
		localStorage.setItem("user_data", JSON.stringify(user));
	},
	setProfile: (profile) => {
		set({ profile });
		localStorage.setItem("user_profile", JSON.stringify(profile));
	},
	clearUser: () => {
		set({ user: null });
		localStorage.removeItem("user_data");
	},
	clearProfile: () => {
		set({ profile: null });
		localStorage.removeItem("user_profile");
	},
	clearUserAndProfile: () => {
		set({ user: null, profile: null });
		localStorage.removeItem("user_data");
		localStorage.removeItem("user_profile");
	},
}));
