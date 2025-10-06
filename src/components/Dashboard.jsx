import { use, useEffect, useState } from "react"
import { useContext } from "react"
import Navbar from "./Navbar"
import { AppContext } from "../../context/AppContext";



export default function Dashboard() {
  //   const user = {
  //   username: "Diya Gupta",
  //   age: 22,
  //   email: "diya@example.com",
  // };
  const {getUserData} = useContext(AppContext);
  const [user,setUser] = useState(null);
  useEffect(()=>{
    const fetch = async ()=>{
      try {
        // console.log("getUserData function:", getUserData);
        const data = await getUserData();
       
        setUser(data);
        
      } catch (error) {
        console.log(error);
      }

    };
    fetch();

  },[getUserData]);

	return (
    <div className="min-h-screen bg-gradient-to-br from-[#DCD0A8] to-[#FFF9E5]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* ✅ Check if user exists */}
        {user ? (
          <div className="bg-gradient-to-r from-[#004030] to-[#4A9782] shadow-lg rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#DCD0A8]">
              User Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700">
              <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-[#004030]">Username</p>
                <p className="text-lg font-semibold">{user.username}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-[#004030]">Age</p>
                <p className="text-lg font-semibold">{user.age}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                <p className="text-sm font-medium text-[#004030]">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          // 🔄 Loading state
          <div className="bg-gray-100 rounded-2xl p-6 mb-6 text-center">
            <p className="text-gray-600">Loading user data...</p>
          </div>
        )}

        {/* Placeholder for tasks (future section) */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Task Information
          </h2>
          <p className="text-gray-600">You can add tasks here later...</p>
        </div>
      </div>
    </div>
  );
}