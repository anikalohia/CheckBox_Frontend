import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar"; // ✅ Import Navbar
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// axios.defaults.withCredentials = true;

export default function Signup() {
  const [username,setUsername] = useState("");
   const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
     const [age,setAge] = useState("");
     const navigate = useNavigate();

  async function handleSignup(e){
  e.preventDefault();
  try {
      const res = await axios.post("/api/auth/create", {
        username,
        email,
        password,
        age,

      });
      console.log(res.data.message)
      toast(res.data.message);
       if (res.data.message === "Signup successful") {
        navigate("/"); // redirect to home
      }
    } catch (err) {
      toast(err.response.message);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DCD0A8]  to-[#FFF9E5]">
      {/* ✅ Reusable Navbar */}
      <Navbar />

      {/* ✅ Signup Section */}
      <div className="flex justify-center items-center py-16 border-[#004030] border-t ">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/70 p-10 rounded-3xl shadow-2xl w-96 border-[#004030] "
        >
          <h2 className="text-3xl font-extrabold  from-[#DCD0A8]  to-[#FFF9E5] mb-6 text-center">
            Create Account
          </h2>
          <form className="space-y-5" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
              className="w-full p-3 border border-[#004030] border-t rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="w-full p-3 border border-[#004030] border-t rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="password"
              placeholder="Password"
              
              required
              className="w-full p-3 border border-[#004030] border-t rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              required
              className="w-full p-3 border border-[#004030] border-t rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
             <input
              type="number"
              placeholder="Age"
              onChange={(e)=>setAge(e.target.value)}
              value={age}
              required
              className="w-full p-3 border border-[#004030] border-t rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-300 border-[#004030] border-t"
            >
              Sign Up
            </motion.button>
          </form>
          <p className="mt-6 text-sm text-center">
            Already have an account?{" "}
            <a href="/login" className="text-pink-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
