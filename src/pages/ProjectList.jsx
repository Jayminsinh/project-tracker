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
      <div className="m-8 flex justify-between items-center">
        <input
          type="text"
          value={titlesearch}
          onChange={(e) => setTitlesearch(e.target.value)}
          placeholder="Search projects"
          className="px-3 py-2 bg-gray-300 rounded-md"
        />

        <select
          className="px-3 py-2 bg-gray-300 rounded-md font-medium"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="complete">Completed</option>
          <option value="onhold">On-hold</option>
        </select>
      </div>
      <div className="m-8 rounded-lg  shadow-2xl">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900 text-white font-medium ">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Due Date</th>
              <th className="px-4 py-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((p, i) => (
              <tr
                key={p.projectId}
                className="border-t bg-gray-50 hover:bg-gray-200 text-md font-medium"
              >
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">{p.title}</td>
                <td className="px-4 py-3 ">
                  <span className="text-sm text-blue-900 bg-blue-100 font-mono rounded-2xl px-2">
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3">{p.date}</td>
                <td className="flex gap-2 justify-start items-center">
                  <button onClick={() => navigate(`/projects/${p.projectId}`)} className="text-sm px-2 py-1 my-2 bg-green-500 text-white rounded-lg hover:cursor-pointer hover:bg-green-400">View</button>
                  <button onClick={() => handleDelete(p.projectId)} className="text-sm px-2 py-1 my-2 bg-red-500 text-white rounded-lg hover:cursor-pointer hover:bg-red-400">Delete</button>
                  <button onClick={() => handleUpdate(p)} className="text-sm px-2 py-1 my-2 bg-orange-500 text-white rounded-lg hover:cursor-pointer hover:bg-orange-400">Edit</button>
                </td>
              </tr>
            ))}
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
