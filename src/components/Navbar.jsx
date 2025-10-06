import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

import { AppContext } from "../../context/AppContext.jsx";

export default function Navbar() {
  const getCookie = (name) => { 
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};


  const {userData,setUserData,isLoggedIn,setIsLoggedIn} = useContext(AppContext);
  useEffect(()=>{
    
    const token = getCookie("token");
    console.log("Token generated");
    if(token){
      setIsLoggedIn(true);
    }
    

  },[])

  return (
    <nav className="backdrop-blur-md bg-[#DCD0A8] shadow-md sticky top-0 z-50 ">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#004030]">CheckBox🎯</h1>
        <ul className="flex space-x-6 font-medium text-gray-700">
          <li>
            <a href="/" className="hover:text-pink-600 transition">
              Home
            </a>
          </li>
          <li>
            <a href="/task" className="hover:text-pink-600 transition">
              Task
            </a>
          </li>
          {isLoggedIn? 
          (
            <>
            <li>
            
            <a href="/dashboard" className="hover:text-pink-600 transition">
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/api/auth/logout"
              className="px-4 py-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition"
            >
              Logout
            </a>
          </li>
            </>
          ) : (
            <>
            <li>
            
            <a href="/login" className="hover:text-pink-600 transition">
              Login
            </a>
          </li>
          <li>
            <a
              href="/signup"
              className="px-4 py-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition"
            >
              Sign Up
            </a>
          </li>
            </>
          )}
          
        </ul>
      </div>
    </nav>
  );
}
