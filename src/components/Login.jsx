import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar"; // ✅ Reuse Navbar
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate= useNavigate();
  async function handleLogin(e){
  e.preventDefault();
  try{
    const res = await axios.post("/api/auth/login",{
    email,
    password
  });
  console.log(res.data);
  toast(res.data.message);
  if(res.data.message==="Login successful"){
    navigate('/');
  }
  }catch(err){
    console.log(err);
    toast(err.response.data.message);
  }

}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DCD0A8]  to-[#FFF9E5]">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Login Section */}
      <div className="flex justify-center items-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/70 p-10 rounded-3xl shadow-2xl w-96 border-[#004030]"
        >
          <h2 className="text-3xl font-extrabold  from-[#DCD0A8]  to-[#FFF9E5] mb-6 text-center">
            Welcome Back
          </h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#004030] rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-[#004030] rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-300"
            >
              Login
            </motion.button>
          </form>

          {/* Extra Links */}
          <div className="mt-4 flex justify-between text-sm">
            <a href="#" className="text-pink-600 hover:underline">
              Forgot Password?
            </a>
            <a href="/signup" className="text-pink-600 hover:underline">
              Create Account
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
