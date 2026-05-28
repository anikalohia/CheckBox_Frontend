import React, { useContext, useState, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import Calendar from 'react-calendar';
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { TaskContext } from '../../context/TaskContext';
import { AppContext } from '../../context/AppContext';
import { Plus, Sparkles, Trash2, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';

function Task() {
    const { getUserTask } = useContext(TaskContext);
    const { getUserData } = useContext(AppContext);
    
    const [date, setDate] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const [label, setLabel] = useState("#FFDE63");
    const [user, setUser] = useState(null);
    const [goal, setGoal] = useState("");
    const [isAiLoading, setIsAiLoading] = useState(false);

    const fetchTasks = useCallback(async () => {
        try {
            const task = await getUserTask();
            setTasks(task || []);
        } catch (error) {
            console.log(error);
        }
    }, [getUserTask]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userdata = await getUserData();
                setUser(userdata.username);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
        fetchTasks();
    }, [getUserData, fetchTasks]);

    async function deleteTask(id) {
        try {
            await axios.delete(`/api/task/delete/${id}`);
            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    }

    async function checkedTask(id, ischecked) {
        if (ischecked) {
            setTimeout(() => {
                deleteTask(id);
                alert("Woohoo! Completed a task");
            }, 500);
        }
    }

    async function addTask(e) {
        e.preventDefault();
        try {
            await axios.post("/api/task/create", {
                title,
                description,
                date,
                label
            });
            setOpenModal(false);
            setTitle("");
            setDescription("");
            fetchTasks();
        } catch (err) {
            console.log(err);
        }
    }

    async function generateAiPlan() {
        if (!goal) return;
        setIsAiLoading(true);
        try {
            const res = await axios.post("/api/ai/plan", { goal });
            if (res.data.success) {
                const aiTasks = res.data.tasks;
                for (const taskTitle of aiTasks) {
                    await axios.post("/api/task/create", {
                        title: taskTitle,
                        description: `Part of goal: ${goal}`,
                        date: date,
                        label: "#D78FEE"
                    });
                }
                fetchTasks();
                setGoal("");
            }
        } catch (error) {
          console.error("AI Planning Error:", error);
          alert("AI Planning Error: " + (error.response?.data?.message || error.message));
        } finally {            setIsAiLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#f3f3f3] text-black">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h1 className="text-6xl font-black tracking-tighter mb-2 italic">
                            HELLO, <span className="bg-[#FFDE63] px-4 border-[3px] border-black shadow-[6px_6px_0px_0px_#000000]">{user || 'EXPLORER'}</span>
                        </h1>
                        <p className="text-xl font-bold uppercase tracking-widest mt-6">You've got tasks to crush today.</p>
                    </div>
                    
                    <button 
                        onClick={() => setOpenModal(true)}
                        className="neo-btn bg-[#E06B80] h-fit"
                    >
                        <Plus size={24} strokeWidth={3} className="mr-2" />
                        NEW TASK
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Sidebar: Calendar & AI */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="neo-box p-6 bg-white">
                            <Calendar 
                                onChange={setDate} 
                                value={date} 
                                className="w-full"
                            />
                        </div>

                        <div className="neo-box p-8 bg-[#D78FEE]">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles size={28} strokeWidth={3} />
                                <h2 className="text-2xl font-black">AI PLANNER</h2>
                            </div>
                            <p className="font-bold mb-6">Enter a goal and let AI do the work.</p>
                            <div className="space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="e.g. Master React in 7 days" 
                                    className="neo-input w-full"
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                />
                                <button 
                                    onClick={generateAiPlan}
                                    disabled={isAiLoading || !goal}
                                    className="neo-btn w-full bg-black text-white hover:bg-[#33A1E0] hover:text-black"
                                >
                                    {isAiLoading ? "THINKING..." : "GENERATE PLAN"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content: Task List */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-10 pb-4 border-b-[3px] border-black">
                            <h2 className="text-3xl font-black flex items-center gap-3">
                                <Clock size={32} strokeWidth={3} />
                                TASKS FOR {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                            </h2>
                            <span className="neo-btn bg-white py-1 px-4 text-sm cursor-default hover:transform-none hover:shadow-hard-shadow-sm">{tasks.length} ITEMS</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {tasks.map((task, index) => (
                                    <div
                                        key={task._id}
                                        className="neo-box p-6 relative group flex flex-col h-full"
                                        style={{ backgroundColor: task.labelcolor || '#ffffff' }}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <input 
                                                type="checkbox" 
                                                className="w-8 h-8 border-[3px] border-black bg-white appearance-none checked:bg-black checked:before:content-['✓'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center font-black cursor-pointer"
                                                onChange={(e) => checkedTask(task._id, e.target.checked)}
                                            />
                                            <button onClick={() => deleteTask(task._id)} className="neo-btn p-2 bg-[#E06B80] hover:bg-red-600">
                                                <Trash2 size={20} strokeWidth={3} />
                                            </button>
                                        </div>

                                        <h3 className="text-2xl font-black mb-4 line-clamp-2">
                                            {task.title.toUpperCase()}
                                        </h3>
                                        <p className="font-bold text-gray-800 mb-8 flex-grow">
                                            {task.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t-[3px] border-black/20">
                                            <div className="flex items-center gap-2 font-black text-sm uppercase">
                                                <CalendarIcon size={18} strokeWidth={3} />
                                                {new Date(task.date).toLocaleDateString()}
                                            </div>
                                            <div className="px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-widest">
                                                {task.status || "PENDING"}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            {tasks.length === 0 && (
                                <div className="col-span-full py-24 flex flex-col items-center justify-center neo-box bg-white border-dashed">
                                    <CheckCircle2 size={64} strokeWidth={3} className="mb-6 opacity-20" />
                                    <p className="text-2xl font-black opacity-30 uppercase tracking-widest">Victory! No tasks left.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Add Task Modal */}
            <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
                <div className="bg-white border-[4px] border-black shadow-[10px_10px_0px_0px_#000000] p-4">
                    <ModalHeader className="border-b-[3px] border-black pb-4 text-black font-black uppercase italic">CREATE NEW TASK</ModalHeader>
                    <ModalBody>
                        <form onSubmit={addTask} className="space-y-8 mt-6">
                            <div>
                                <label className="text-sm font-black uppercase tracking-widest mb-3 block">TASK TITLE</label>
                                <input 
                                    type="text" 
                                    className="neo-input w-full"
                                    placeholder="WHAT'S THE PLAN?"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-black uppercase tracking-widest mb-3 block">DETAILS</label>
                                <textarea 
                                    className="neo-input w-full min-h-[120px]"
                                    placeholder="ADD SOME CONTEXT..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-black uppercase tracking-widest mb-3 block">COLOR THEME</label>
                                <div className="flex gap-4">
                                    {['#FFDE63', '#E06B80', '#33A1E0', '#8ABB6C', '#D78FEE'].map(c => (
                                        <button 
                                            key={c}
                                            type="button"
                                            onClick={() => setLabel(c)}
                                            className={`w-10 h-10 border-[3px] border-black transition-all ${label === c ? 'scale-125 shadow-[4px_4px_0px_0px_#000000] -translate-x-1 -translate-y-1' : 'opacity-80 hover:opacity-100'}`}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="neo-btn w-full bg-[#33A1E0] mt-4"
                            >
                                ADD TO LIST
                            </button>
                        </form>
                    </ModalBody>
                </div>
            </Modal>
        </div>
    );
}

export default Task;
