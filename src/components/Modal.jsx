import React from 'react'
import { Modal, ModalBody, ModalHeader} from "flowbite-react";
function Modal({openModal}) {
    return (
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
                                 
                                 <button type='submit' className='bg-pink-500 rounded-2xl text-sm font-bold p-3 text-amber-50 hover:bg-pink-600 transition'>Add Task</button>
                                 
                                  </form>
                               </div>
                             </ModalBody>
                           </Modal>
    )
}

export default Modal
