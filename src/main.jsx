import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios';
import App from './App.jsx'
import { AppContextProvider } from '../context/AppContext.jsx'
import { TaskContextProvider } from '../context/TaskContext.jsx'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
axios.defaults.withCredentials = true;
console.log("Vite API URL check:", import.meta.env.VITE_API_URL);

createRoot(document.getElementById('root')).render(
  
    <AppContextProvider>
      <TaskContextProvider>
        <App />
      </TaskContextProvider>
    
    </AppContextProvider>
  ,
)
