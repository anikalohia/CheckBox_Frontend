import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from '../context/AppContext.jsx'
import { TaskContextProvider } from '../context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <AppContextProvider>
      <TaskContextProvider>
        <App />
      </TaskContextProvider>
    
    </AppContextProvider>
  ,
)
