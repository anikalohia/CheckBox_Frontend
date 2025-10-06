import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar"; // ✅ Reuse Navbar

export default function Home() {
  return (
  <div className="min-h-screen bg-gradient-to-br from-[#DCD0A8]  to-[#FFF9E5]">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold text-[#004030] drop-shadow-md"
        >
          Welcome to <span className="text-[#004030]">CheckBox</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-6 text-lg text-[#004030] max-w-2xl"
        >
          A beautiful pink-themed app where you can create an account, log in, and
          explore amazing features. Built with ❤️ and style.
        </motion.p>

        <motion.a
          href="/signup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 inline-block bg-gradient-to-r from-[#004030] to-[#4A9782] text-[#DCD0A8] px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
        >
          Get Started
        </motion.a>
      </div>

      {/* ✅ Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          { title: "Fast & Secure", text: "Your data is safe with our secure platform." },
          { title: "Easy to Use", text: "A simple and clean interface for everyone." },
          { title: "Modern Design", text: "Beautiful pink aesthetic with smooth UI." },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-lg text-[#004030] rounded-2xl shadow-lg p-6 text-center border-black-200"
          >
            <h3 className="text-xl font-semibold text-[#004030] mb-2">
              {feature.title}
            </h3>
            <p className="text-[#004030]">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
