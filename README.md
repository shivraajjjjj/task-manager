# Task Management Web Application

A simple full-stack task manager where users can create, view, update, and delete tasks.

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB

## Features
- Add tasks with title and description
- View all tasks
- Update task status
- Delete tasks
- Persistent storage with MongoDB

## Project Flow
1. **User Interface**: The frontend is built using React and Vite, providing a responsive and interactive user experience.
2. **API Communication**: The frontend communicates with the backend through RESTful API calls.
3. **Data Management**: The backend handles data operations, including CRUD functionalities, using a mongoDB database.
4. **Routing**: The application uses routing to navigate between different views and components.

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

## Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/shivraajjjjj/task-manager.git
   cd task-manager
   ```
2. **Install Backend Dependencies**:
   ```bash
   cd Backend
   npm install
   ```
3. **Configure Environment Variables (Backend)**:
   Create a `.env` file inside the `Backend` folder:
   ```env
   MONGO_URL=your_mongodb_connection_string
   PORT=5000
   ```
4. **Install Frontend Dependencies**:
   ```bash
   cd ../Frontend
   npm install
   ```
5. **Run the Backend Server**:
   ```bash
   cd ../Backend
   node server.js
   ```
6. **Run the Frontend Application**:
   ```bash
   cd ../Frontend
   npm run dev
   ```
