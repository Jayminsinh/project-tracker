import React, { useEffect, useState } from "react";
import Formfield from "./Formfield";
import { useDispatch, useSelector } from "react-redux";
import { validator } from "../utils/validator";
import {  updateProject } from "../store/projectsSlice";


const ProjectForm = ({ onClose, editproject}) => {
    // console.log(editproject)
  const isAuth = useSelector((state) => state.users.isAuth);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);

  const initialValue = {
    title: "",
    description: "",
    date: "",
    status: "active",
  };
  const [formData, setFormData] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    if(editproject){
        setFormData(editproject)
    }
  },[editproject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validator(formData, isAuth);
    setError(validation);

    if (Object.keys(validation).length === 0) {
      
        dispatch(
          updateProject({
            userId: user.userId,
            projectId: editproject.projectId,
            title: formData.title,
            description: formData.description,
            date: formData.date,
            status: formData.status,
          }),
        );
      
      setFormData(initialValue);
      onClose();
    }
  };

  return (
    <div className="flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-5"
      >
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-4">
          Create Project
        </h2>

        <Formfield
          label="Project Title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          error={error.title}
        />

        {/* Description */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 text-sm
                   bg-white border border-gray-300 rounded-xl
                   resize-none
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                   transition"
          />

          {error.description && (
            <p className="text-xs text-red-500">
              {error.description}
            </p>
          )}
        </div>

        <Formfield
          label="Due Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          error={error.date}
        />

        {/* Status */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Project Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm
                   bg-white border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                   transition"
          >
            <option value="active">Active</option>
            <option value="complete">Complete</option>
            <option value="onhold">On Hold</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium
                 hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
