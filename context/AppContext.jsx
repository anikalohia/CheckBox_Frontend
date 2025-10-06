import axios from 'axios';
import {toast} from 'react-toastify'
import { use } from 'react';
import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppContextProvider = (props)=>{
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [userData,setUserData] = useState(false);

    const getUserData = async()=>{
        try {

           const { data } = await axios.get('/api/user/dashboard', { withCredentials: true });
          
            if(data.success){
                setIsLoggedIn(true);
                setUserData(data.userData);
                return data.userData;
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        getUserData();
    },[])
const value = {
    isLoggedIn,setIsLoggedIn,
    userData,setUserData,getUserData
}

return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)
}