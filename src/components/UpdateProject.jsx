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
    <div className="py-5 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-md">
        <Formfield
          label="Project title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          error={error.title}
        />
        <label className="font-semibold">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="resize-none block bg-gray-100 w-full px-2 py-2 rounded-md mb-3"
          />
          <p className="text-sm text-red-700 font-normal">
            {error.description}
          </p>
        </label>
        <Formfield
          label="Due Date"
          name="date"
          type="date"
          error={error.date}
          value={formData.date}
          onChange={handleChange}
        />
        <div className="mb-3 flex items-center gap-3">
          <label htmlFor="status" className="font-medium">
            {" "}
            Project Status :{" "}
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-2 bg-gray-100"
          >
            <option value="active">Active</option>
            <option value="complete">Complete</option>
            <option value="onhold">On Hold</option>
          </select>
        </div>

        <button className="w-full bg-green-800 py-2 mt-3 text-white font-bold hover:bg-green-700 hover:cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
