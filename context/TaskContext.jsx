import axios from 'axios';
import {toast} from 'react-toastify'
import { createContext, useState, useEffect } from 'react';


export const TaskContext = createContext();

export const TaskContextProvider = (props)=>{
    const [task,setTask] = useState([]);
    const getUserTask = async()=>{
        try{
            const {data} = await axios.get('/api/task/get')
            if(data.tasks){
                setTask(data.tasks)

            }
            return data.tasks


        }catch(error){
            console.log(error);
            toast.error('Failed to fetch tasks');

        }
    }
    useEffect(()=>{
        getUserTask()
    },[])
    const value = {
        task,setTask,
        getUserTask
    }
    return(
        <TaskContext.Provider value={value}>
            {props.children}
           
        </TaskContext.Provider>
    )
}