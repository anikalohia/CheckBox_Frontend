import React from 'react'
import Navbar from './Navbar'

function Task() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#DCD0A8]  to-[#FFF9E5]">
            <Navbar/>
            <h1 className='text-3xl font-bold text-center my-8 text-[#004030]'>Task Page</h1>
            <p className='text-center mb-4 text-gray-700'>This is where you can manage your tasks.</p>
            <form>
                <input type="text" placeholder='Enter your task' />
                <button type='submit'>Add Task</button>

            </form>
        </div>
    )
}

export default Task
