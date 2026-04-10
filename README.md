# Task Management Web Application

A simple full-stack task manager where users can create, view, update, and delete tasks.

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB

## Features
- Add tasks with title and description
- View all tasks
- Update task status (pending / completed)  
- Delete tasks  
- Filter tasks by status (All / Pending / Completed)  
- Persistent storage with MongoDB


## Project Flow
1. **Frontend (React + Vite)**  
   Provides a responsive UI and handles user interactions.

2. **API Communication**  
   Frontend communicates with backend using RESTful APIs.

3. **Backend (Express + MongoDB)**  
   Handles CRUD operations and data persistence.
   

## Project Structure

### Backend
```
Backend/
├── package.json       # Backend dependencies and scripts
├── server.js          # Main server file
├── models/            # Database models
│   └── Task.js       # Task model
└── routes/           # API routes
    └── taskRoutes.js # Task-related routes
```


### Frontend
```
Frontend/
├── eslint.config.js   # ESLint configuration
├── index.html         # Main HTML file
├── package.json       # Frontend dependencies and scripts
├── README.md          # Project documentation
├── vite.config.js     # Vite configuration
└── src/              # Source files
    ├── api.js        # API calls
    ├── App.jsx       # Main React component
    ├── index.css     # Global CSS styles
    └──  main.jsx      # Entry point for React
    
```

## Setup Instructions
 **Clone the repository**:
   ```bash
   git clone https://github.com/shivraajjjjj/task-manager.git
   cd task-manager
   ```
### 1. Prerequisites
- Node.js and npm installed
- MongoDB connection string available

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create `Backend/.env`:
```env
MONGO_URL=your_mongodb_connection_string
PORT=3000
```

Start backend:
```bash
node server.js
```

Backend currently:
- Reads `MONGO_URL` and `PORT` from `Backend/.env`
- Exposes task API at `http://localhost:3000/task`

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

Create or update `Frontend/.env`:
```env
VITE_API_URL=http://localhost:3000/task
```

Start frontend:
```bash
npm run dev
```

Frontend currently:
- Uses `VITE_API_URL` as the axios `baseURL`
- Calls `/`, `/:id` endpoints relative to `VITE_API_URL`
