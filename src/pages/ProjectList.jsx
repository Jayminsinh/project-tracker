import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Formfield from "../components/Formfield";
import useDebounce from "../hooks/useDebounce";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteProject } from "../store/projectsSlice";
import Modal from "../components/Modal";
import UpdateProject from "../components/UpdateProject";

function ProjectList() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const statusFromUrl = queryParams.get("status")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.projects.projects);
  const user = useSelector((state) => state.users.currentUser);

  const userProjects = projects.filter((p) => p.userId === user.userId);
  const [titlesearch, setTitlesearch] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (statusFromUrl) {
      setStatus(statusFromUrl)
    }
  }, [statusFromUrl])

  const debouncedSearch = useDebounce(titlesearch, 500);
  const debouncedStatus = useDebounce(status, 500);

  const filteredProjects = userProjects.filter((p) =>
    p.title.toLowerCase().includes(debouncedSearch.toLocaleLowerCase()),
  ).filter(p =>
    debouncedStatus ? p.status === debouncedStatus : true
  )

  const handleDelete = (id) => {
    dispatch(deleteProject(id))
  }
  const [selectProject, setSelectProject] = useState("")
  const [open, setOpen] = useState(false)

  const handleUpdate = (p) => {
    setSelectProject(p);
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  // console.log(selectProject)
  return (
    <div className="m-5">
      <div className="m-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

        <input
          type="text"
          value={titlesearch}
          onChange={(e) => setTitlesearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full sm:w-80 px-4 py-2.5 text-sm 
               bg-white border border-gray-200 rounded-xl
               focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
               transition"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full sm:w-48 px-4 py-2.5 text-sm
               bg-white border border-gray-200 rounded-xl
               focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
               transition"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="complete">Completed</option>
          <option value="onhold">On-hold</option>
        </select>

      </div>
      <div className="m-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Due Date</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredProjects.map((p, i) => (
              <tr
                key={p.projectId}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-500">
                  {i + 1}
                </td>

                <td className="px-6 py-4 font-semibold text-gray-800">
                  {p.title}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {p.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {p.date}
                </td>

                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/projects/${p.projectId}`)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleUpdate(p)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.projectId)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProjects.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-10 text-center text-gray-500 text-sm"
                >
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={open} onClose={handleClose}>
        <UpdateProject onClose={handleClose} editproject={selectProject} />
      </Modal>
    </div>
  );
}

export default ProjectList;
