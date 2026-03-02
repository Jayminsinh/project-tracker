import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function ProjectView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const allProjects = useSelector(state => state.projects.projects)
  const project = allProjects.find(p => p.projectId === id)
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
  <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8 animate-fadeIn">

    <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">
      Project Details
    </h2>

    <div className="mt-6 space-y-5">

      <div>
        <p className="text-sm text-gray-500">Project Title</p>
        <p className="text-base font-medium text-gray-800">
          {project.title}
        </p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Project Description</p>
        <p className="text-base text-gray-700 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Due Date</p>
          <p className="text-base font-medium text-gray-800">
            {project.date}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
            {project.status}
          </span>
        </div>
      </div>

    </div>

    <div className="mt-8 flex justify-end">
      <button
        onClick={() => navigate(-1)}
        className="px-5 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
      >
        Go Back
      </button>
    </div>

  </div>
</div>
  )
}

export default ProjectView
