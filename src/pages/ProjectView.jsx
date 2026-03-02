import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function ProjectView() {
    const {id} = useParams()
    const navigate = useNavigate()
    const allProjects = useSelector(state => state.projects.projects)
    const project = allProjects.find(p => p.projectId === id)
  return (
    <div className='fixed inset-0 flex justify-center items-center'>
      <div className='bg-gray-50 shadow-2xl p-8 w-xl'>
        <h1 className='pb-3 border-b border-red-600 text-center font-medium text-2xl'>Project Details</h1>
        <div className='p-5 bg-gray-200 rounded-lg mt-3'>
        <h1 className='font-semibold text-md'>Project Title: <span className='text-md font-normal text-gray-800 uppercase'>{project.title}</span></h1>
        <h1 className='font-semibold text-md'>Project Description: 
            <p className='text-md font-normal text-gray-800 uppercase'>{project.description}</p>
        </h1>
        <h1 className='font-semibold text-md'>Project Due-date: <span className='text-md font-normal text-gray-800 uppercase'>{project.date}</span></h1>
        <h1 className='font-semibold text-md'>Project Status: <span className='text-md font-normal text-gray-800 uppercase'>{project.status}</span></h1>
      </div>
      <button onClick={() => navigate(-1)} className='mt-3 px-4 py-2 bg-gray-800 text-white font-bold rounded-lg hover:scale-105 transition hover:cursor-pointer'>Go Back</button>
      </div>
    </div>
  )
}

export default ProjectView
