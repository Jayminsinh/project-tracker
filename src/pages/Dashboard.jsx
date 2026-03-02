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
    <div className="p-8 space-y-8">

  {/* Welcome Section */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <h1 className="text-2xl font-semibold text-gray-800">
      Welcome back,{" "}
      <span className="text-blue-600 font-bold">
        {user.username}
      </span>
      👋
    </h1>

    <button
      onClick={handleClick}
      className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl
                 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg
                 transition-all duration-200"
    >
      + Create New Project
    </button>
  </div>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

    {/* Active */}
    <div
      onClick={() => handleStatus("active")}
      className="group cursor-pointer rounded-2xl p-6 bg-white border border-gray-200
                 shadow-sm hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Active Projects</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {active.length}
          </p>
        </div>
        <div className="text-3xl">🚀</div>
      </div>
    </div>

    {/* Completed */}
    <div
      onClick={() => handleStatus("complete")}
      className="group cursor-pointer rounded-2xl p-6 bg-white border border-gray-200
                 shadow-sm hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Completed Projects</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {complete.length}
          </p>
        </div>
        <div className="text-3xl">✅</div>
      </div>
    </div>

    {/* On Hold */}
    <div
      onClick={() => handleStatus("onhold")}
      className="group cursor-pointer rounded-2xl p-6 bg-white border border-gray-200
                 shadow-sm hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">On Hold</p>
          <p className="text-3xl font-bold text-amber-500 mt-2">
            {onhold.length}
          </p>
        </div>
        <div className="text-3xl">⏸️</div>
      </div>
    </div>

    {/* Overdue */}
    <div
      className="rounded-2xl p-6 bg-white border border-gray-200
                 shadow-sm hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Overdue Projects</p>
          <p className="text-3xl font-bold text-red-500 mt-2">
            {overDue.length}
          </p>
        </div>
        <div className="text-3xl">⚠️</div>
      </div>
    </div>

  </div>

  {/* Modal */}
  <Modal isOpen={open} onClose={handleClose}>
    <ProjectForm onClose={handleClose} />
  </Modal>

</div>
  )
}

export default Dashboard
