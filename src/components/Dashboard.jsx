import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import { AppContext } from "../../context/AppContext";
import { TaskContext } from "../../context/TaskContext";
import { User, Mail, Calendar, Hash, CheckCircle2, ListTodo, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { getUserTask } = useContext(TaskContext);
  const { getUserData } = useContext(AppContext);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [userData, taskData] = await Promise.all([
          getUserData(),
          getUserTask()
        ]);
        setUser(userData);
        setTasks(taskData || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [getUserData, getUserTask]);

  const stats = [
    { label: "TASKS", value: tasks.length, icon: <ListTodo size={32} strokeWidth={3} />, color: "#FFDE63" },
    { label: "DONE", value: tasks.filter(t => t.status === 'completed').length, icon: <CheckCircle2 size={32} strokeWidth={3} />, color: "#8ABB6C" },
    { label: "VIBE", value: "100%", icon: <TrendingUp size={32} strokeWidth={3} />, color: "#33A1E0" },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-20">
          <h1 className="text-7xl font-black tracking-tighter uppercase italic">
            USER <span className="bg-[#FFDE63] px-4 border-[4px] border-black shadow-[8px_8px_0px_0px_#000000]">PROFILE</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* User Profile Card */}
          <div className="lg:col-span-4">
            <div className="neo-box p-10 bg-white sticky top-24">
              <div className="w-32 h-32 bg-[#D78FEE] border-[4px] border-black shadow-[8px_8px_0px_0px_#000000] flex items-center justify-center text-5xl font-black mb-10 transform -rotate-3">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              
              <div className="space-y-10">
                <div>
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-2 block">USERNAME</label>
                  <div className="flex items-center gap-3 text-2xl font-black italic">
                    <User size={24} strokeWidth={3} />
                    {user?.username?.toUpperCase() || "LOADING..."}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-2 block">EMAIL</label>
                  <div className="flex items-center gap-3 font-bold text-lg">
                    <Mail size={24} strokeWidth={3} />
                    {user?.email || "LOADING..."}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-2 block">AGE</label>
                  <div className="flex items-center gap-3 font-bold text-lg">
                    <Hash size={24} strokeWidth={3} />
                    {user?.age || "N/A"} YEARS OLD
                  </div>
                </div>
              </div>

              <button className="neo-btn w-full mt-12 bg-black text-white hover:bg-[#E06B80] hover:text-black">
                EDIT PROFILE
              </button>
            </div>
          </div>

          {/* Productivity Stats & Insights */}
          <div className="lg:col-span-8 space-y-16">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="neo-box p-8 flex flex-col items-center text-center group" style={{ backgroundColor: stat.color }}>
                  <div className="w-16 h-16 bg-white border-[3px] border-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-black mb-1 italic">{stat.value}</div>
                  <div className="text-sm font-black uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Task Overview */}
            <div className="neo-box p-10 bg-white">
              <div className="flex items-center justify-between mb-12 pb-4 border-b-[3px] border-black">
                <h2 className="text-3xl font-black italic">RECENT ACTION</h2>
                <button className="text-sm font-black uppercase underline underline-offset-4 decoration-[3px] hover:text-[#33A1E0]">VIEW ALL</button>
              </div>

              <div className="space-y-6">
                {tasks.slice(0, 5).map((task, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 bg-[#f3f3f3] border-[3px] border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-4 h-4 border-[3px] border-black" style={{ backgroundColor: task.labelcolor || '#ffffff' }} />
                      <div>
                        <div className="text-xl font-black mb-1 italic group-hover:text-indigo-400 transition-colors">{task.title.toUpperCase()}</div>
                        <div className="text-xs font-black text-gray-500 flex items-center gap-1 uppercase tracking-widest">
                          <Calendar size={14} strokeWidth={3} />
                          {new Date(task.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest">
                      {task.status || "PENDING"}
                    </div>
                  </div>
                ))}

                {tasks.length === 0 && !isLoading && (
                  <div className="text-center py-16 font-black text-2xl opacity-20 italic uppercase tracking-widest">
                    NO TASKS FOUND. GET TO WORK!
                  </div>
                )}

                {isLoading && (
                   <div className="text-center py-16 font-black text-xl animate-pulse uppercase">
                    LOADING YOUR INTEL...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
