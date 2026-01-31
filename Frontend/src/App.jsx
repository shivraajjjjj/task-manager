import React from 'react'
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from './api';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
if(!import.meta.env.VITE_API_URL){
  console.error("VITE_API_URL is not defined in the environment variables.");
}
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');

  //fetch tasks from backend
  const fetchTasks = async () => {
    try {
       const res = await getTasks();
      // console.log("API DATA:", res.data);
       setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  useEffect(()=>{
    fetchTasks();
  },[]);


  //Add task
  const handleAdd= async (e) => {
    e.preventDefault();
    try {
      if(!title || !description) return;

      const newTask = { title, description };
      await createTask(newTask);
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  //Toggle task status
  const handleToggleStatus = async (task) => {
    try {
      await updateTask(task._id, {
        status: task.status === 'completed' ? 'pending' : 'completed'
      });
      fetchTasks();
    }catch (error) {
      console.error('Error updating task status:', error);
    }
  }

  //Delete task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
             Task Manager
          </h1>
          <p className="text-gray-600">Organize your day, achieve your goals</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100">
          {/* Add Task Form */}
          <form onSubmit={handleAdd} className="mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                  placeholder="Enter task title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                  placeholder="Add description..."
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg btn hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg"
              >
                Add Task
              </button>
            </div>
          </form>

          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">No tasks yet</p>
              <p className="text-gray-400 text-sm mt-2">Create your first task to get started!</p>
            </div>
          ) : (
            <>
              {/* Filter Buttons */}
              <div className="flex gap-3 mb-6 justify-center">
                <button
                  className={`px-5 py-2 rounded-lg font-medium btn ${
                    filter === "all" 
                      ? "bg-gray-800 text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All ({tasks.length})
                </button>
                <button
                  className={`px-5 py-2 rounded-lg font-medium btn ${
                    filter === "pending" 
                      ? "bg-amber-500 text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setFilter("pending")}
                >
                  Pending ({tasks.filter(t => t.status === 'pending').length})
                </button>
                <button
                  className={`px-5 py-2 rounded-lg font-medium btn ${
                    filter === "completed" 
                      ? "bg-green-500 text-white shadow-md" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setFilter("completed")}
                >
                  Completed ({tasks.filter(t => t.status === 'completed').length})
                </button>
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                {tasks.filter(task => {
                  if (filter === "all") return true;
                  return task.status === filter;
                }).map((task) => (
                  <div
                    key={task._id}
                    className="task-card flex justify-between items-center bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-indigo-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">
                          {task.status === "completed" ? "✅" : "⏳"}
                        </span>
                        <p className={`font-semibold text-lg ${
                          task.status === "completed" 
                            ? "line-through text-gray-400" 
                            : "text-gray-800"
                        }`}>
                          {task.title}
                        </p>
                      </div>
                      <p className={`text-sm ml-7 ${
                        task.status === "completed" 
                          ? "text-gray-400" 
                          : "text-gray-600"
                      }`}>
                        {task.description}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleToggleStatus(task)}
                        className={`text-sm font-medium px-4 py-2 rounded-lg btn shadow-sm ${
                          task.status === "completed"
                            ? "bg-amber-500 hover:bg-amber-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        {task.status === "completed" ? "Undo" : "Complete"}
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-sm font-medium bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg btn shadow-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          {tasks.length > 0 && (
            <p>
              {tasks.filter(t => t.status === 'completed').length} of {tasks.length} tasks completed
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;