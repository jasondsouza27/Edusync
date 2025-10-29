# Dashboard Feature Documentation

## Overview
The Dashboard provides users with a personalized view of their learning progress, including time tracking and lab completion statistics.

## Features

### 1. User Profile Section
- Displays user avatar (first letter of username)
- Shows username and email
- Member since date

### 2. Statistics Cards
- **Labs Completed**: Total number of labs accessed
- **Total Time**: Cumulative time spent across all labs
- **Average Time/Lab**: Average time spent per lab

### 3. Lab Activity Table
Shows detailed information for each lab:
- Lab name
- Category (Data Structures, Algorithms, C Programming)
- Time spent (formatted as hours, minutes, seconds)
- Last accessed date
- Completion status

### 4. Quick Actions
Quick links to main lab categories:
- Data Structures
- Algorithms
- C Programming

## How It Works

### Time Tracking
The `useLabTimeTracker` hook automatically tracks time when users visit labs:

```jsx
import useLabTimeTracker from "@/utils/useLabTimeTracker";

function MyLab() {
  // Automatically starts tracking time
  useLabTimeTracker("Lab Name", "Category");
  
  return <div>Your lab content</div>;
}
```

**How it tracks:**
1. Starts timer when component mounts
2. Updates localStorage every 5 seconds
3. Final update when component unmounts
4. Accumulates time across multiple visits

### Data Storage
Lab statistics are stored in browser localStorage with the key format:
```
labStats_${userId}
```

Each entry contains:
```javascript
{
  labName: "Stack Simulation",
  category: "Data Structures",
  timeSpent: 120, // in seconds
  lastAccessed: "2025-10-29T10:30:00.000Z"
}
```

## Usage

### Accessing the Dashboard
1. User must be logged in
2. Click "Dashboard" in the navigation header
3. Or navigate to `/dashboard`

### Adding Time Tracking to a Lab
To add time tracking to any lab component:

```jsx
import useLabTimeTracker from "@/utils/useLabTimeTracker";

export default function YourLab() {
  // Add this line at the top of your component
  useLabTimeTracker("Your Lab Name", "Category Name");
  
  // Rest of your component code
  return (
    <div>
      {/* Your lab content */}
    </div>
  );
}
```

**Categories:**
- "Data Structures"
- "Algorithms"
- "C Programming"

## Example Implementation

### Stack Simulation Example
```jsx
import useLabTimeTracker from "@/utils/useLabTimeTracker";

export default function Simul() {
  // Tracks time for Stack Simulation
  useLabTimeTracker("Stack Simulation", "Data Structures");
  
  // Your existing code...
}
```

## URLs
- **Dashboard Page**: `http://localhost:3001/dashboard`
- **Protected Route**: Redirects to `/login` if not authenticated

## Components

### Dashboard.jsx
Main dashboard component with:
- User profile display
- Statistics cards
- Lab activity table
- Quick action links

### useLabTimeTracker.jsx
Custom React hook for time tracking:
- Starts timer on mount
- Updates every 5 seconds
- Cleans up on unmount
- Stores data in localStorage

## Features to Add in Future

1. **Export Data**: Download lab statistics as CSV/PDF
2. **Goals**: Set learning goals and track progress
3. **Streaks**: Track consecutive days of learning
4. **Achievements**: Unlock badges for milestones
5. **Charts**: Visual graphs of progress over time
6. **Compare**: Compare progress with peers
7. **Recommendations**: Suggest labs based on weak areas
8. **Calendar**: View learning activity on calendar

## Testing the Dashboard

1. **Start the servers**:
   ```bash
   npm run dev
   ```

2. **Login to your account**:
   - Navigate to `http://localhost:3001/login`
   - Enter your credentials

3. **Visit some labs**:
   - Go to any lab (e.g., Stack, Queue, Bubble Sort)
   - Spend some time interacting with the lab
   - The time tracker will automatically record your activity

4. **Check your dashboard**:
   - Click "Dashboard" in the header
   - Or navigate to `http://localhost:3001/dashboard`
   - You should see your lab activity and time statistics

## Troubleshooting

### Dashboard shows no labs
- Make sure you're logged in
- Visit some labs first to generate activity data
- Check browser console for errors

### Time not updating
- Ensure you're logged in
- Check that localStorage is enabled in your browser
- Verify the useLabTimeTracker hook is imported correctly

### Dashboard not accessible
- Verify you're logged in (pb.authStore.isValid)
- Check the dashboard route exists at `/pages/dashboard/index.jsx`
- Clear browser cache and reload

## Security Notes

- Dashboard is protected - requires authentication
- Time data is stored per user (user ID based)
- Data persists in browser localStorage
- Clear localStorage to reset statistics

## Future Enhancements

### Backend Integration (Optional)
Instead of localStorage, you can store lab statistics in PocketBase:

1. Create a `lab_stats` collection in PocketBase
2. Modify `useLabTimeTracker` to save to PocketBase
3. Update Dashboard to fetch from PocketBase
4. Benefits: Data syncs across devices, permanent storage

### Example PocketBase Schema:
```javascript
{
  user: "relation to users collection",
  labName: "text",
  category: "text",
  timeSpent: "number",
  lastAccessed: "date"
}
```
