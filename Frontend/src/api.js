import axios from 'axios';

const API= axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const getTasks=()=>API.get('/');
export const createTask=(newTask)=>API.post('/',newTask);
export const updateTask=(id,updatedTask)=>API.put(`/${id}`,updatedTask);
export const deleteTask=(id)=>API.delete(`/${id}`);