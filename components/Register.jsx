import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import pb from "@/utils/mypb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cPassword, setCPassword] = useState("");
	const [uName, setUName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);
	const [termsAccepted, setTermsAccepted] = useState(false);

	const register = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const data = {
			username: uName,
			email: email,
			emailVisibility: true,
			password: password,
			passwordConfirm: cPassword,
		};

		try {
			// Create the user record
			const record = await pb.collection("vlabs_users").create(data);
			
			toast.success("Account created! Logging you in...");
			
			// Wait a bit before trying to login
			await new Promise(resolve => setTimeout(resolve, 500));
			
			// Automatically log in the user after registration using email
			try {
				const authData = await pb
					.collection("vlabs_users")
					.authWithPassword(email, password);
				
				toast.success("Login successful! Redirecting...");
				
				// Redirect to home page after a short delay
				setTimeout(() => {
					router.push("/");
				}, 1000);
			} catch (loginErr) {
				console.error("Login error after registration:", loginErr);
				toast.success("Account created successfully!");
				toast.info("Please login with your credentials.");
				setTimeout(() => {
					router.push("/login");
				}, 2000);
			}
		} catch (err) {
			console.error("Registration error:", err);
			
			// Check if it's a connection error
			if (err.message && err.message.includes("fetch")) {
				toast.error("Cannot connect to server. Please make sure PocketBase is running.");
			} else if (err.status === 0) {
				toast.error("Cannot connect to PocketBase server at http://127.0.0.1:8090");
			} else if (err.data?.data) {
				// Handle specific field errors
				Object.keys(err.data.data).forEach((key) => {
					const fieldError = err.data.data[key];
					const message = fieldError.message || fieldError.code || "Invalid value";
					toast.error(`${key}: ${message}`);
				});
			} else if (err.data?.message) {
				toast.error(err.data.message);
			} else if (err.message) {
				toast.error(err.message);
			} else {
				toast.error("Registration failed. Make sure 'vlabs_users' Auth collection exists in PocketBase.");
			}
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
								Create an Account
							</h1>
							
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={register}
							>
								<div>
									<label
										htmlFor="name"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Username
									</label>
									<input
										value={uName}
										onChange={(e) => {
											setUName(e.target.value);
										}}
										type="text"
										name="name"
										id="name"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
										placeholder="John Doe"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Your email
									</label>
									<input
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										type="email"
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
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
										required
									/>
									{password && password.length < 8 && (
										<p className="mt-2 text-sm text-red-600">
											Password must be at least 8 characters
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="confirm-password"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Confirm password
									</label>
									<input
										value={cPassword}
										onChange={(e) => {
											setCPassword(e.target.value);
										}}
										type="password"
										name="confirm-password"
										id="confirm-password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
										required
									/>
									{password && cPassword && password !== cPassword && (
										<p className="mt-2 text-sm text-red-600">
											Passwords don&apos;t match
										</p>
									)}
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
									disabled={
										!(
											email &&
											uName &&
											password &&
											cPassword &&
											password === cPassword &&
											password.length >= 8 &&
											termsAccepted
										) || isLoading
									}
									type="submit"
									className="w-full disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
								>
									{isLoading ? (
										<span className="flex items-center justify-center">
											<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											Creating account...
										</span>
									) : (
										'Create an account'
									)}
								</button>
								<p className="text-sm font-light text-gray-500">
									Already have an account?{" "}
									<Link
										href="/login"
										className="font-medium text-blue-600 hover:underline"
									>
										Login here
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
