import { useEffect, useRef } from "react";
import pb from "@/utils/mypb";

/**
 * Custom hook to track time spent on a lab
 * @param {string} labName - Name of the lab
 * @param {string} category - Category (e.g., "Data Structures", "Algorithms", "C Programming")
 */
export const useLabTimeTracker = (labName, category) => {
	const startTimeRef = useRef(null);
	const intervalRef = useRef(null);

	const updateLabTime = () => {
		if (!startTimeRef.current || !pb.authStore.isValid) {
			console.log("Time tracking skipped - no start time or not logged in");
			return;
		}

		const userId = pb.authStore.model?.id;
		if (!userId) {
			console.log("Time tracking skipped - no user ID");
			return;
		}

		// Calculate time spent in seconds
		const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
		
		if (timeSpent === 0) {
			console.log("Time tracking skipped - 0 seconds elapsed");
			return;
		}

		console.log(`Tracking ${timeSpent} seconds for ${labName} (${category})`);

		// Get existing lab stats
		const storageKey = `labStats_${userId}`;
		const existingStats = JSON.parse(localStorage.getItem(storageKey) || "[]");

		// Find if this lab already exists
		const labIndex = existingStats.findIndex(
			(stat) => stat.labName === labName && stat.category === category
		);

		if (labIndex !== -1) {
			// Update existing lab
			existingStats[labIndex].timeSpent += timeSpent;
			existingStats[labIndex].lastAccessed = new Date().toISOString();
			console.log(`Updated existing lab - Total time: ${existingStats[labIndex].timeSpent}s`);
		} else {
			// Add new lab entry
			existingStats.push({
				labName,
				category,
				timeSpent,
				lastAccessed: new Date().toISOString(),
			});
			console.log(`Added new lab entry - Time: ${timeSpent}s`);
		}

		// Save to localStorage
		localStorage.setItem(storageKey, JSON.stringify(existingStats));
		console.log("Lab stats saved to localStorage");

		// Reset start time for next interval
		startTimeRef.current = Date.now();
	};

	useEffect(() => {
		// Check if user is logged in
		if (!pb.authStore.isValid) {
			console.log("Time tracking not started - user not logged in");
			return;
		}

		const userId = pb.authStore.model?.id;
		if (!userId) {
			console.log("Time tracking not started - no user ID");
			return;
		}

		console.log(`Started tracking time for: ${labName} (${category})`);
		
		// Start tracking time when component mounts
		startTimeRef.current = Date.now();

		// Update time every 5 seconds
		intervalRef.current = setInterval(() => {
			updateLabTime();
		}, 5000);

		// Cleanup on unmount
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			console.log(`Stopped tracking time for: ${labName}`);
			// Final time update
			updateLabTime();
		};
	}, [labName, category]);
};

export default useLabTimeTracker;
