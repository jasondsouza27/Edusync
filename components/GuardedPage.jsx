import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/utils/authService";

export default function GuardedPage({ children }) {
	const router = useRouter();
	
	const checkAuth = () => {
		if (!isAuthenticated()) {
			router.push("/login");
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return <>{children}</>;
}
