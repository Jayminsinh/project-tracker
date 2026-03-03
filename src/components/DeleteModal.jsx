import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProject } from '../store/projectsSlice'

function DeleteModal({ project, onClose }) {
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(deleteProject(project.projectId))
        onClose()
    }
    return (
        <div className="p-8 max-w-sm mx-auto bg-white rounded-xl">
            {/* Header Section */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    Delete Project
                </h2>
                <div className="mt-2 h-1 w-12 bg-red-500 rounded-full"></div>
            </div>

            {/* Body Content */}
            <div className="mb-8">
                <p className="text-gray-600 leading-relaxed">
                    Are you sure you want to delete <span className="font-semibold text-gray-900 underline decoration-red-200">"{project.title}"</span>?
                    This action is permanent and cannot be undone.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
                <button
                    onClick={handleDelete}
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-sm shadow-red-200 transition-all active:scale-[0.98] hover:cursor-pointer"
                >
                    Confirm Delete
                </button>

                <button
                    onClick={onClose}
                    className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-200 transition-all hover:cursor-pointer"
                >
                    Keep Project
                </button>
            </div>
        </div>
    )
}

export default DeleteModal
