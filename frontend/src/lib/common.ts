export const setAccessToken = (token: string) => {
	if (!token) return;
	localStorage.setItem("access_token", token);
};
export const setRefreshToken = (refresh_token: string) => {
	if (!refresh_token) return;
	localStorage.setItem("refresh_token", refresh_token);
};
export const removeAccessToken = (): void => {
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
};
