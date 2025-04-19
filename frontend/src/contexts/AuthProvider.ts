// AuthProvider.jsx
import { useEffect } from "react";
import { useRefreshToken } from "../hooks/auth/useAuth";


const AuthProvider = ({ children }) => {
	const { refreshToken } = useRefreshToken();

	useEffect(() => {
		const initAuth = async () => {
			const token = localStorage.getItem("access_token");
			if (token) {
				try {
					await refreshToken();
				} catch (error) {
					console.log("Không thể làm mới token");
				}
			}
		};

		initAuth();
	}, [refreshToken]);

	return children;
};

export default AuthProvider;
