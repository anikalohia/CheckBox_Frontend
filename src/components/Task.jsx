import React, { useContext ,useState} from 'react'
import Navbar from './Navbar'
import Calendar from 'react-calendar'
import {  Label, Modal, ModalBody, ModalHeader} from "flowbite-react";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { TaskContext } from '../../context/TaskContext';
import { useEffect } from 'react';





function Task() {
  const {getUserTask} = useContext(TaskContext)
    const [date, setDate] = useState(new Date())
    const [openModal, setOpenModal] = useState(false);
    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks,setTasks] = useState([])
    const [completed,setCompleted] = useState(false);
    const [color,setColor] = useState("green")
    const [label,setLabel] = useState("")
    const [editingTask,setEditingTask] = useState(null)
    const [updateModal,setUpdateModal] = useState(true)

  async function checkedTask(id){
    setCompleted(true)
    if(completed){
      console.log("Task completed")
      setTimeout(()=>{
        deleteTask(id)
      },5000)
    }
    setCompleted(false)

  }

  useEffect(()=>{
    const fetch = async()=>{
      try{
        const task = await getUserTask();
        setTasks(task || [])
        
        setColor(task[3].labelcolor)
      }catch (error) {
        console.log(error);
      }
    }
    fetch()
    },[getUserTask])
    
    async function updateTask(e,id) {
     e.preventDefault()
      try{
        const res = await axios.patch(`/api/task/update/${id}`,{
          title,description,date,label

        })
        console.log(res.data)
        setEditingTask()
        setTitle("");
      }catch(error){
        console.log(error)
      }
      
    }
 
    async function deleteTask(id){
     
      try{
        const res = await axios.delete(`/api/task/delete/${id}`)
        console.log(res.data)
      }catch(error){
        console.log(error)
      }

    }
    async function addTask(e){
        e.preventDefault();
        console.log("Adding task:")
        try{
          const res = await axios.post("/api/task/create",{
            title,
            description,
            date,
            label
           

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
      function onCloseUpdateModal(){
        setUpdateModal(false);
      }
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#DCD0A8]  to-[#FFF9E5]">
            <Navbar/>
            <h1 className='text-4xl font-bold text-center my-8 text-[#004030]'>Task Page</h1>
            <p className='text-center font-bold mb-4 text-gray-700 text-1xl'>This is where you can manage your tasks.</p>
             <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl calendar-wrapper flex-row gap-10">
           
             <Calendar className="border-none  " onChange={setDate} value={date} dateFormat="dd/mm/yy" showIcon/>
             <div className='min-h-[20vh] w-[90%] bg-amber-200 rounded-2xl p-5'>
              <div className='bg-amber-100 p-3.5 w-fit rounded-2xl m-3'>
                <h1 className='font-bold text-2xl text-green-700'>{date.toDateString()}</h1>
              </div>
             <button onClick={() => setOpenModal(true)} className='bg-pink-600 rounded-2xl text-sm font-bold p-3 text-amber-50 hover:bg-pink-400 m-3'>ADD TASK</button>

             </div>
             
             
             </div>
            
            
             <Modal show={openModal} onClose={onCloseModal} popup position='center' style={{ maxWidth: "800px", margin: "auto" , maxHeight: "800px", zIndex: 2}}>
                     <ModalHeader className='border-[#004030] border-t-4' />
                     <ModalBody className='shadow-xl/30 bg-[#e0cc97]'>
                       <div className="space-y-6 align-center">
                         <h3 className="text-xl font-medium text-gray-900 dark:text-black flex justify-center ">Add your task here</h3>
                          <form className='flex-col justify-center' onSubmit={addTask}>
                            <div>
                           <div className="mb-2 block dark:text-black">
                             <label htmlFor="date" className='dark:text-black'>Date: </label>
                             <input type="text" id="date" name="date"  className='w-2xl' value={date.toDateString()} readOnly/>
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
                          <label htmlFor="card" className='m-2'>Label:</label>
                          <div className='m-2 gap-2 flex ' data-toggle="buttons" role='group' >
                            <input type="radio" name="label" className='appearance-none cursor-pointer w-7 h-7 bg-[#FFDE63] border border-yellow-400 rounded-full checked:bg-yellow-400 checked:border-yellow-500' value={label} onClick={()=>{setLabel("#FFDE63")}}></input>
                            <input type="radio" name="label" className='appearance-none cursor-pointer w-7 h-7 bg-[#E06B80] border border-red-400 rounded-full checked:bg-red-400 checked:border-red-400' value={label} onClick={()=>{setLabel("#E06B80")}}></input>
                            <input type="radio" name="label" className='appearance-none cursor-pointer w-7 h-7 bg-[#D78FEE] border border-purple-400 rounded-full checked:bg-purple-500 checked:border-purple-500' value={label} onClick={()=>{setLabel("#D78FEE")}}></input>
                            <input type="radio" name="label" className='appearance-none cursor-pointer w-7 h-7 bg-[#33A1E0] border border-blue-400 rounded-full checked:bg-blue-500 checked:border-blue-500' value={label} onClick={()=>{setLabel("#33A1E0")}}></input>
                            <input type="radio" name="label" className='appearance-none cursor-pointer w-7 h-7 bg-[#8ABB6C] border border-green-400 rounded-full checked:bg-green-500 checked:border-green-500' value={label} onClick={()=>{setLabel("#8ABB6C")}}></input>
                            
                          </div>
                         </div>
                         <button type='submit' className='bg-pink-500 rounded-2xl text-sm font-bold p-3 text-amber-50 hover:bg-pink-600 transition'>Add Task</button>
                         
                          </form>
                       </div>
                     </ModalBody>
                   </Modal>
                  <div id="right" className='bg-amber-50 flex overflow-y-auto'>
              {tasks.length>0?(

                <div className='grid grid-cols-5 gap-4 mx-20 my-10 '>
                {tasks.map((task,index)=>(
                  <div className={` p-5 m-4 min-h-70 min-w-70 rounded-xl `} style={{backgroundColor: task.labelcolor || "#FFDE63"}} key={index}>
                    <input type="checkbox" className='bg-amber-100 h-4 w-4' onChange={()=>{checkedTask(task._id)}}></input>
                    <div className='text-amber-800 font-bold text-2xl'>{task.title}</div>
                    
                    <div className='text-amber-800 font-bold text-2xl'>
                      {new Date(task.date).toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </div>
                    <button type="button"className='bg-red-500 m-2 p-3 rounded-2xl hover:bg-red-700'  onClick={()=>{deleteTask(task._id)}}>Delete</button>
                    <button className='bg-green-500 p-3 rounded-2xl hover:bg-green-700' onClick={()=>{setEditingTask(task) }}>Update</button>
                    {editingTask && (
                      <Modal show={updateModal} onClose={onCloseUpdateModal} popup position='center' style={{ maxWidth: "800px", margin: "auto" , maxHeight: "800px", zIndex: 2}}>
                                                 <ModalHeader className='border-[#004030] border-t-4' />
                                                 <ModalBody className='shadow-xl/30 bg-[#e0cc97]'>
                                                   <div className="space-y-6 align-center">
                                                     <h3 className="text-xl font-medium text-gray-900 dark:text-black flex justify-center ">Update your task here</h3>
                                                      <form className='flex-col justify-center' onSubmit={(e)=>{updateTask(e,editingTask._id)}}>
                                                        <div>
                                                       <div className="mb-2 block dark:text-black">
                                                         <label htmlFor="date" className='dark:text-black'>Date: </label>
                                                         <input type="text" id="date" name="date"  className='w-2xl' value={new Date(editingTask.date).toDateString()} />
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
                                                     
                                                     <button type='submit' className='bg-pink-500 rounded-2xl text-sm font-bold p-3 text-amber-50 hover:bg-pink-600 transition'>Update Task</button>
                                                     
                                                    </form>
                                                   </div>
                                                 </ModalBody>
                                               </Modal>

                    )}
                    <div className='text-amber-800 font-bold '>{task.description}</div>
                  </div>
                  
))}

                </div>
              ):(
                <>
                {console.log("no task")}
                <div>No tasks yet</div>
                </>
              )}
              </div>
            
        </div>
    )
}

export default Task
