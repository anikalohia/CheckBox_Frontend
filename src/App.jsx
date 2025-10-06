import { useState,useEffect } from 'react'
import './App.css'
import Login from './components/Login';
import Signup from './components/Signin'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Homepage'
import axios from "axios";
import LoggedHome from './components/LoggedHome';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/Dashboard';

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  

  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signUp" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<LoggedHome/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>


      </Routes>

    </Router>
    
    </>
  )
}

export default App
