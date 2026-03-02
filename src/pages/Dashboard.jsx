import React, { useState } from 'react'
import Modal from '../components/Modal'
import ProjectForm from '../components/ProjectForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Dashboard() {
  const navigate = useNavigate()
  const user = useSelector(state => state.users.currentUser)
  const projects = useSelector(state => state.projects.projects.filter(p => p.userId === user.userId))
  const today = new Date();
  // console.log(projects)
  const active = projects.filter(p => p.status === "active")
  const complete = projects.filter(p => p.status === "complete")
  const onhold = projects.filter(p => p.status === "onhold")
  const overDue = projects.filter((p) => {
    const due = new Date(p.date)
    return due < today
  })

  // console.log(overDue)
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleStatus = (status) => {
      navigate(`/projects?status=${status}`)
  }
  return (
    <div className='p-6 space-y-5 '>
      <h1 className='text-center text-2xl font-bold'>Welcome, <span className='text-blue-600'>{user.username}</span></h1>
      <div className='grid grid-cols-4 gap-5'>
        <div onClick={() => handleStatus("active")} className='rounded-lg py-2 px-2 bg-gray-100 shadow-2xl hover:border-2 hover:border-blue-600 transition'>
          <p className='text-sm text-gray-700'>Active Projects:</p>
          <div className='text-2xl font-semibold'>{active.length}</div>
        </div>
        <div onClick={() => handleStatus("complete")} className='rounded-lg py-2 px-2 bg-gray-100 shadow-2xl hover:border-2 hover:border-orange-600 transition'>
          <p className='text-sm text-gray-700'>Completed Projects:</p>
          <div className='text-2xl font-semibold'>{complete.length}</div>
        </div>
        <div onClick={() => handleStatus("onhold")} className='rounded-lg py-2 px-2 bg-gray-100 shadow-2xl hover:border-2 hover:border-green-600  transition'>
          <p className='text-sm text-gray-700'>On hold Projects:</p>
          <div className='text-2xl font-semibold'>{onhold.length}</div>
        </div>
        <div className='rounded-lg py-2 px-2 bg-gray-100 shadow-2xl hover:border-2 hover:border-red-600  transition'>
          <p className='text-sm text-gray-700'>Over-Due Projects:</p>
          <div className='text-2xl font-semibold'>{overDue.length}</div>
        </div>
      </div>
      <div className='flex justify-end p-5'>
        <button onClick={handleClick} className='px-3 py-2 bg-blue-800 text-white font-medium rounded-md hover:bg-blue-600 hover:cursor-pointer'>+ Create new Project</button>
      </div>
      <Modal isOpen={open} onClose={handleClose}>
        <ProjectForm onClose={handleClose} />
      </Modal>
    </div>
  )
}

export default Dashboard
