import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import pb from "@/utils/mypb";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
	const router = useRouter();
	const [id, setId] = useState("");
	const [pass, setPass] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const login = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		
		try {
			const authData = await pb
				.collection("vlabs_users")
				.authWithPassword(id, pass);

			if (authData.token) {
				toast.success("Login successful! Redirecting...");
				// Redirect to home page after a short delay
				setTimeout(() => {
					router.push("/");
				}, 1000);
			}
		} catch (error) {
			console.error(error);
			toast.error("Invalid credentials. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{isMounted && <ToastContainer 
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>}
			{/* Background similar to Hero component */}
			<div
				style={{ zIndex: "-1" }}
				className="w-full opacity-30 bg-[url('/img/home/bits.avif')] bg-repeat-x bg-top md:bg-center bg-cover md:bg-contain h-screen flex items-center justify-center fixed top-0"
			></div>
			
			<section className="relative min-h-screen">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
					<div className="w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
								Login to Your Account
							</h1>
							<form className="space-y-4 md:space-y-6" onSubmit={login}>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Username or Email
									</label>
									<input
										value={id}
										onChange={(e) => {
											setId(e.target.value);
										}}
										type="text"
										name="email"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
										placeholder="name@company.com"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Password
									</label>
									<input
										value={pass}
										onChange={(e) => {
											setPass(e.target.value);
										}}
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
										required
									/>
								</div>
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="terms"
											aria-describedby="terms"
											type="checkbox"
											checked={termsAccepted}
											onChange={(e) => setTermsAccepted(e.target.checked)}
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
											required
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="terms"
											className="font-light text-gray-500"
										>
											I accept the{" "}
											<a
												className="font-medium text-blue-600 hover:underline"
												href="#"
												onClick={(e) => e.preventDefault()}
											>
												Terms and Conditions
											</a>
										</label>
									</div>
								</div>
								<button
									disabled={!(id && pass && termsAccepted) || isLoading}
									type="submit"
									className="w-full disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
								>
									{isLoading ? (
										<span className="flex items-center justify-center">
											<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											Logging in...
										</span>
									) : (
										'Login'
									)}
								</button>
								<p className="text-sm font-light text-gray-500">
									Don&apos;t have an account?{" "}
									<Link
										href="/register"
										className="font-medium text-blue-600 hover:underline"
									>
										Register here
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
