# EduSync - Virtual Labs Platform

A comprehensive virtual laboratory platform built with Next.js and PocketBase, providing interactive simulations and tests for computer science concepts.

## 🚀 Features

- **Interactive Virtual Labs**: Hands-on simulations for data structures and algorithms
- **Multiple Topics Covered**:
  - Data Structures (Stacks, Queues, Linked Lists, Binary Trees)
  - Sorting Algorithms (Bubble Sort, Quick Sort, Selection Sort)
  - C Programming Concepts (Loops, Recursion, Functions, Strings, Matrix Operations)
  - ASCII and String Operations
- **User Authentication**: Secure login and registration system powered by PocketBase
- **Real-time Testing**: Interactive tests and quizzes for each topic
- **Theory & Practice**: Comprehensive theory sections with practical simulations

## 🛠️ Tech Stack

- **Frontend**: Next.js 13.4.19, React 18.2.0
- **Backend**: PocketBase v0.22.20
- **Styling**: TailwindCSS 3.3.3
- **Code Editor**: Monaco Editor
- **State Management**: React Hooks
- **Notifications**: React Toastify
- **Diagrams**: ReactFlow

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/edusync.git
   cd edusync/vlabs2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090
   ```

4. **Set up PocketBase**
   
   The project includes PocketBase executable. You need to:
   - Create an admin account
   - Create an Auth collection named `vlabs_users`
   - Configure API rules (see PocketBase Setup section)

## 🚀 Running the Application

### Option 1: Run both servers with one command (Recommended)

```bash
npm run dev
```

This starts:
- PocketBase server on `http://127.0.0.1:8090`
- Next.js development server on `http://localhost:3001`

### Option 2: Run servers separately

**Terminal 1 - PocketBase:**
```bash
npm run dev:pb
```

**Terminal 2 - Next.js:**
```bash
npm run dev:next
```

## 📦 PocketBase Setup

1. Open PocketBase Admin UI: http://127.0.0.1:8090/_/
2. Create an admin account (first time only)
3. Go to **Collections** → **New collection**
4. Select **Auth collection** (important!)
5. Name it: `vlabs_users`
6. Go to **API Rules** tab
7. For the **create** rule:
   - Click the lock icon
   - Delete everything in the field (leave it empty for public registration)
   - Click **Save changes**

## 📁 Project Structure

```
vlabs2/
├── components/           # React components
│   ├── Login.jsx        # Login page
│   ├── Register.jsx     # Registration page
│   ├── Hero.jsx         # Landing page
│   ├── Heady.jsx        # Navigation header
│   ├── Stack/           # Stack implementation labs
│   ├── Queue/           # Queue implementation labs
│   ├── Linked List/     # Linked list labs
│   └── ...              # Other lab components
├── pages/               # Next.js pages
│   ├── index.jsx        # Home page
│   ├── login/           # Login route
│   ├── register/        # Register route
│   ├── ds/              # Data structures routes
│   ├── aoa/             # Analysis of algorithms routes
│   └── c/               # C programming routes
├── utils/               # Utility functions
│   ├── mypb.jsx         # PocketBase client
│   ├── array.jsx        # Array utilities
│   └── variable.jsx     # Variable utilities
├── public/              # Static assets
└── styles/              # Global styles
```

## 🎓 Available Labs

### Data Structures
- **Stacks**: Push, Pop, Peek operations with visualization
- **Queues**: Enqueue, Dequeue operations with visualization
- **Linked Lists**: Insertion, Deletion, Traversal
- **Binary Trees**: Tree traversal and operations

### Algorithms
- **Bubble Sort**: Step-by-step visualization
- **Quick Sort**: Partition and sorting visualization
- **Selection Sort**: Selection process visualization

### C Programming
- **Loops**: For, While, Do-While demonstrations
- **Recursion**: Recursive function examples
- **Functions**: Call by value vs call by reference
- **Strings**: String manipulation functions
- **Matrix**: Matrix operations and transformations
- **ASCII**: Character encoding demonstrations

## 🔐 Authentication

The platform uses PocketBase for authentication:
- User registration with email verification
- Secure login system
- Password hashing and security
- Session management
- Protected routes

## 📝 Scripts

- `npm run dev` - Start both PocketBase and Next.js
- `npm run dev:next` - Start only Next.js development server
- `npm run dev:pb` - Start only PocketBase server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows - Kill process on port 3001
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Kill process on port 8090
netstat -ano | findstr :8090
taskkill /PID <PID> /F
```

### PocketBase 404 Error
- Ensure `vlabs_users` collection exists
- Check collection name spelling (case-sensitive)

### PocketBase 403 Error
- Verify API Rules are unlocked for registration
- Check the "create" rule is empty or permissive

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
