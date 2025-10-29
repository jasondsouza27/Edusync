import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import pb from "@/utils/mypb";
import Link from "next/link";

export default function Dashboard() {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [labStats, setLabStats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalTime, setTotalTime] = useState(0);

	useEffect(() => {
		// Check if user is logged in
		if (!pb.authStore.isValid) {
			router.push("/login");
			return;
		}

		loadUserData();
	}, []);

	const loadUserData = async () => {
		try {
			const currentUser = pb.authStore.model;
			setUser(currentUser);

			console.log("Loading dashboard for user:", currentUser?.id);

			// Load lab statistics from localStorage
			const storageKey = `labStats_${currentUser.id}`;
			const stats = JSON.parse(localStorage.getItem(storageKey) || "[]");
			
			console.log("Lab stats from localStorage:", stats);
			console.log("Number of labs:", stats.length);
			
			setLabStats(stats);

			// Calculate total time
			const total = stats.reduce((sum, lab) => sum + (lab.timeSpent || 0), 0);
			setTotalTime(total);
			
			console.log("Total time:", total);

			setLoading(false);
		} catch (error) {
			console.error("Error loading dashboard:", error);
			setLoading(false);
		}
	};

	const formatTime = (seconds) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		if (hours > 0) {
			return `${hours}h ${minutes}m ${secs}s`;
		} else if (minutes > 0) {
			return `${minutes}m ${secs}s`;
		} else {
			return `${secs}s`;
		}
	};

	const handleLogout = () => {
		pb.authStore.clear();
		router.push("/");
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
			</div>
		);
	}

	return (
		<>
			{/* Animated Background similar to Hero component */}
			<div
				style={{ zIndex: "-1" }}
				className="w-full opacity-30 bg-[url('/img/home/bits.avif')] bg-repeat-x bg-top md:bg-center bg-cover md:bg-contain h-screen flex items-center justify-center fixed top-0"
			></div>

			<div className="min-h-screen relative">
				{/* Header */}
				<div className="bg-white shadow">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
						<div className="flex justify-between items-center">
							<div className="flex items-center gap-4">
								<Link href="/" className="cursor-pointer">
									<img
										src="/img/edusynclogo.jpg"
										className="h-12 rounded hover:opacity-80 transition"
										alt="EduSync Logo"
									/>
								</Link>
								<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
							</div>
							<div className="flex gap-4">
								<Link href="/">
									<button className="px-4 py-2 text-gray-700 hover:text-gray-900">
										Home
									</button>
								</Link>
								<button
									onClick={handleLogout}
									className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
								>
									Logout
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					{/* User Profile Section */}
					<div className="bg-white rounded-lg shadow p-6 mb-6">
					<div className="flex items-center space-x-4">
						<div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
							{user?.username?.charAt(0).toUpperCase()}
						</div>
						<div>
							<h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
							<p className="text-gray-600">{user?.email}</p>
							<p className="text-sm text-gray-500 mt-1">
								Member since {new Date(user?.created).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>

				{/* Statistics Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 rounded-full bg-blue-100 text-blue-600">
								<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div className="ml-4">
								<p className="text-sm text-gray-600">Labs Completed</p>
								<p className="text-2xl font-bold text-gray-900">{labStats.length}</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 rounded-full bg-green-100 text-green-600">
								<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div className="ml-4">
								<p className="text-sm text-gray-600">Total Time</p>
								<p className="text-2xl font-bold text-gray-900">{formatTime(totalTime)}</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 rounded-full bg-purple-100 text-purple-600">
								<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
							</div>
							<div className="ml-4">
								<p className="text-sm text-gray-600">Avg. Time/Lab</p>
								<p className="text-2xl font-bold text-gray-900">
									{labStats.length > 0 ? formatTime(Math.floor(totalTime / labStats.length)) : "0s"}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Lab Activity */}
				<div className="bg-white rounded-lg shadow">
					<div className="p-6 border-b border-gray-200">
						<h3 className="text-xl font-bold text-gray-900">Lab Activity</h3>
					</div>
					<div className="p-6">
						{labStats.length === 0 ? (
							<div className="text-center py-12">
								<svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								<h3 className="mt-2 text-sm font-medium text-gray-900">No lab activity yet</h3>
								<p className="mt-1 text-sm text-gray-500">Get started by exploring some labs!</p>
								<div className="mt-6">
									<Link href="/">
										<button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
											Browse Labs
										</button>
									</Link>
								</div>
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Lab Name
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Category
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Time Spent
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Last Accessed
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Status
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{labStats.map((lab, index) => (
											<tr key={index} className="hover:bg-gray-50">
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm font-medium text-gray-900">{lab.labName}</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
														{lab.category}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{formatTime(lab.timeSpent || 0)}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{new Date(lab.lastAccessed).toLocaleDateString()}
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
														Completed
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>

				{/* Quick Actions */}
				<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
					<Link href="/ds">
						<div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
							<h4 className="font-semibold text-gray-900 mb-2">Data Structures</h4>
							<p className="text-sm text-gray-600">Explore stacks, queues, and more</p>
						</div>
					</Link>
					<Link href="/aoa">
						<div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
							<h4 className="font-semibold text-gray-900 mb-2">Algorithms</h4>
							<p className="text-sm text-gray-600">Learn sorting and searching</p>
						</div>
					</Link>
					<Link href="/c">
						<div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
							<h4 className="font-semibold text-gray-900 mb-2">C Programming</h4>
							<p className="text-sm text-gray-600">Master C fundamentals</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
		</>
	);
}
