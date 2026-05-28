import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Zap, Shield, Layout, ArrowRight, Star, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black overflow-hidden font-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 border-b-[3px] border-black">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFDE63] border-[3px] border-black shadow-[4px_4px_0px_0px_#000000] text-xs font-black uppercase tracking-widest mb-10">
              <Star size={16} strokeWidth={3} />
              THE #1 TASK MANAGER
            </div>

            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10 uppercase italic">
              GET SH*T <br />
              <span className="bg-[#33A1E0] px-4 border-[4px] border-black shadow-[8px_8px_0px_0px_#000000]">DONE.</span>
            </h1>

            <p className="text-xl font-bold uppercase tracking-tight max-w-lg mb-12 leading-tight">
              CheckBox is the brutalist way to crush your goals. No fluff. No gradients. Just pure productivity.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-6">
              <Link
                to="/signup"
                className="neo-btn bg-[#8ABB6C] text-xl px-10 py-5 group"
              >
                JOIN THE REVOLUTION
                <ArrowRight size={24} strokeWidth={3} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="neo-btn bg-white text-xl px-10 py-5"
              >
                LOG IN
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="neo-box bg-[#FF8A50] p-8 -rotate-2 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles size={32} strokeWidth={3} />
                <h3 className="text-3xl font-black italic">AI POWERED</h3>
              </div>
              <p className="text-lg font-bold uppercase mb-8">Let artificial intelligence plan your entire week in seconds.</p>
              <div className="bg-white border-[3px] border-black p-4 mb-4 font-bold">
                &gt; Generating flight itinerary...
              </div>
              <div className="bg-black text-white border-[3px] border-black p-4 font-bold">
                &gt; 12 tasks created successfully!
              </div>
            </div>
            <div className="absolute top-10 left-10 w-full h-full bg-[#D78FEE] border-[3px] border-black -z-10 rotate-3 shadow-[10px_10px_0px_0px_#000000]" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-5xl font-black text-center mb-24 italic underline decoration-[#E06B80] decoration-[8px] underline-offset-8">WHY WE'RE BETTER</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              icon: <Zap size={40} strokeWidth={3} className="text-black" />, 
              color: "#FFDE63",
              title: "FAST AF", 
              text: "OPTIMIZED FOR SPEED. CREATE AND ORGANIZE TASKS AT THE SPEED OF LIGHT." 
            },
            { 
              icon: <Shield size={40} strokeWidth={3} className="text-black" />, 
              color: "#33A1E0",
              title: "SECURE AS H*LL", 
              text: "YOUR DATA IS LOCKED DOWN. WE DON'T MESS AROUND WITH PRIVACY." 
            },
            { 
              icon: <Layout size={40} strokeWidth={3} className="text-black" />, 
              color: "#8ABB6C",
              title: "BRUTAL UI", 
              text: "DESIGNED FOR ACTION. A CLEAN, MINIMAL INTERFACE FOR MAXIMUM FOCUS." 
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="neo-box p-10 flex flex-col items-center text-center group"
              style={{ backgroundColor: feature.color }}
            >
              <div className="w-20 h-20 bg-white border-[3px] border-black flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-3xl font-black mb-6 italic underline underline-offset-4">
                {feature.title}
              </h3>
              <p className="font-bold uppercase leading-snug">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black text-white py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            <div>
                <div className="text-7xl font-black text-[#FFDE63] mb-4 tracking-tighter">99.9%</div>
                <div className="text-lg font-bold uppercase tracking-widest">UPTIME</div>
            </div>
            <div>
                <div className="text-7xl font-black text-[#33A1E0] mb-4 tracking-tighter">50K+</div>
                <div className="text-lg font-bold uppercase tracking-widest">CRUSHERS</div>
            </div>
            <div>
                <div className="text-7xl font-black text-[#8ABB6C] mb-4 tracking-tighter">ZERO</div>
                <div className="text-lg font-bold uppercase tracking-widest">FLUFF</div>
            </div>
            <div>
                <div className="text-7xl font-black text-[#E06B80] mb-4 tracking-tighter">10/10</div>
                <div className="text-lg font-bold uppercase tracking-widest">VIBES</div>
            </div>
        </div>
      </section>
    </div>
  );
}
