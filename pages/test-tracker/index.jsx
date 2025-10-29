import React from "react";
import useLabTimeTracker from "@/utils/useLabTimeTracker";
import Link from "next/link";

export default function TimeTrackerTest() {
	// This should start tracking time
	useLabTimeTracker("Test Lab", "Testing");

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-4">Time Tracker Test Page</h1>
				
				<div className="bg-white rounded-lg shadow p-6 mb-6">
					<h2 className="text-xl font-semibold mb-4">Instructions:</h2>
					<ol className="list-decimal list-inside space-y-2">
						<li>Make sure you're logged in</li>
						<li>Open your browser console (F12 → Console tab)</li>
						<li>Stay on this page for at least 10 seconds</li>
						<li>Check console for time tracking messages</li>
						<li>Go to Dashboard to see if time was recorded</li>
					</ol>
				</div>

				<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
					<h3 className="font-semibold mb-2">Expected Console Messages:</h3>
					<ul className="list-disc list-inside space-y-1 text-sm">
						<li>"Started tracking time for: Test Lab (Testing)"</li>
						<li>"Tracking X seconds for Test Lab (Testing)" (every 5 seconds)</li>
						<li>"Lab stats saved to localStorage"</li>
					</ul>
				</div>

				<div className="flex gap-4">
					<Link href="/dashboard">
						<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
							Go to Dashboard
						</button>
					</Link>
					<Link href="/">
						<button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
							Go Home
						</button>
					</Link>
				</div>

				<div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
					<h3 className="font-semibold mb-2">⚠️ Troubleshooting:</h3>
					<p className="text-sm">If you don't see console messages:</p>
					<ul className="list-disc list-inside space-y-1 text-sm mt-2">
						<li>Make sure you're logged in (check header for "Dashboard" button)</li>
						<li>Clear browser console and refresh</li>
						<li>Check Application → Local Storage in DevTools</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
