import React, { useContext } from 'react'
import Navbar from './Navbar'
import Calendar from 'react-calendar'
import {  Label, Modal, ModalBody, ModalHeader} from "flowbite-react";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { TaskContext } from '../../context/TaskContext';
import { useEffect } from 'react';



function Task() {
  const {getUserTask} = useContext(TaskContext)
    const [date, setDate] = React.useState(new Date())
    const [openModal, setOpenModal] = React.useState(false);
    const [title,setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [tasks,setTasks] = React.useState([])
    const [completed,setCompleted] = React.useState(false);

    useEffect(()=>{
      const fetch = async()=>{
        try{
          const task = await getUserTask();
          setTasks(task || [])
         
          
        }catch (error) {
        console.log(error);
      }


      }
      fetch()
    },[getUserTask])
    
    async function addTask(e){
        e.preventDefault();
        console.log("Adding task:")
        try{
          const res = await axios.post("/api/task/create",{
            title,
            description,
            date,
           

          })
          console.log(res.data);
          setOpenModal(false);
          setTitle("");
        }catch(err){
          console.log(err);
        }
    }
    
      function onCloseModal() {
        setOpenModal(false);
        
      }
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#DCD0A8]  to-[#FFF9E5]">
            <Navbar/>
            <h1 className='text-4xl font-bold text-center my-8 text-[#004030]'>Task Page</h1>
            <p className='text-center font-bold mb-4 text-gray-700 text-1xl'>This is where you can manage your tasks.</p>
             <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl">
             <Calendar className="border-none bg-transparent" onChange={setDate} value={date}/>
             </div>
            
             <button onClick={() => setOpenModal(true)} className='bg-pink-600 rounded-2xl text-sm font-bold p-3 text-amber-50 hover:scale-z-50'>ADD TASK</button><h1> FOR {date.toDateString()}</h1>
             <Modal show={openModal} onClose={onCloseModal} popup position='center' style={{ maxWidth: "800px", margin: "auto" , maxHeight: "800px", zIndex: 2}}>
                     <ModalHeader className='border-[#004030] border-t-4' />
                     <ModalBody className='shadow-xl/30 bg-[#e0cc97]'>
                       <div className="space-y-6 align-center">
                         <h3 className="text-xl font-medium text-gray-900 dark:text-black flex justify-center ">Add your task here</h3>
                          <form className='flex-col justify-center' onSubmit={addTask}>
                            <div>
                           <div className="mb-2 block dark:text-black">
                             <label htmlFor="date" className='dark:text-black'>Date: </label>
                             <input type="text" id="date" name="date"  className='w-2xl' value={date.toDateString()} />
                           </div>
                           
                         </div>
                         <div>
                           <div className="mb-2 block dark:text-black">
                             <label htmlFor="Title" className='dark:text-black'>Title</label>
                           </div>
                           <input
                            type='text'
                             id="title"
                             value={title}
                             placeholder="Read a Book"
                             onChange={(e)=>setTitle(e.target.value)}
                             className='w-2xl text-black bg-white border-rounded-md p-2'
                             required
                           />
                         </div>
                         <div>
                           <div className="mb-2 block ">
                             <label htmlFor="description" className='dark:text-black'>Description</label>
                           </div>
                           <textarea id="description" className='w-2xl bg-white' type="text" value={description} onChange={(e)=>{
                            setDescription(e.target.value)
                           }} required />
                         </div>
                         <div className='flex gap-2'>
                          <label for="card" className='m-2'>Label:</label>
                          <div className='m-2 gap-2 flex'>
                            <button className='bg-[#FFDE63] rounded-full h-7 w-7 hover:scale-75 border-white border-2 '></button>
                            <button className='bg-[#E06B80] rounded-full h-7 w-7 hover:scale-75 border-white border-2 '></button>
                            <button className='bg-[#D78FEE] rounded-full h-7 w-7 hover:scale-75 border-white border-2 '></button>
                            <button className='bg-[#33A1E0] rounded-full h-7 w-7 hover:scale-75 border-white border-2 '></button>
                            <button className='bg-[#8ABB6C] rounded-full h-7 w-7 hover:scale-75 border-white border-2 '></button>
                          </div>
                         </div>
                         <button type='submit' className='bg-pink-500 rounded-2xl text-sm font-bold p-3 text-amber-50 hover:bg-pink-600 transition'>Add Task</button>
                         
                          </form>
                       </div>
                     </ModalBody>
                   </Modal>
                  <div id="right" className='bg-amber-50 flex overflow-y-auto'>
              {tasks.length>0?(

                <>
                {tasks.map((task)=>(
                  <div className='bg-[#DD7BDF] p-5 m-4 min-h-70 min-w-70 rounded-xl ' >
                    <input type="checkbox" className='bg-amber-100 h-4 w-4'></input>
                    <div className='text-amber-800 font-bold text-2xl'>{task.title}</div>
                    <div className='text-amber-800 font-bold text-2xl'>{task.date}</div>
                    <div className='text-amber-800 font-bold '>{task.description}</div>
                  </div>
                  
))}

                </>
              ):(
                <>
                {console.log("mo task")}
                <div>No tasks yet</div>
                </>
              )}
              </div>
            
        </div>
    )
}

export default Task
