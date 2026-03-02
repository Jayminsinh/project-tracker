import React, {  useState } from "react";
import Formfield from "./Formfield";
import { useDispatch } from "react-redux";
import { addUser, loginUser } from "../store/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import { validator } from "../utils/validator";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Form = ({label}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users)
  const initialValue = {
    username: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validator(formData);
    setError(validation)

    if (Object.entries(validation).length === 0) {
      if(label === "Login"){
        const findUser = users.find(user => (user.email === formData.email && user.username === formData.username))
        const user = users.find(user => (user.email === formData.email && user.username === formData.username))
        console.log(findUser)
        if(findUser){
          dispatch(loginUser(user))
          navigate("/dashboard")
        } else{
          setError({
            username: "Inavalid Username or email",
            email: "Invalid Username or email"
          })
        }
      } else if(label === "SignUp"){
        dispatch(
          addUser({
            userId: nanoid(),
            username: formData.username,
            email: formData.email
          })
        )
        alert("Sign up successfully")
        navigate("/login")
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      
      <form onSubmit={handleSubmit} className="py-10 px-4 w-md bg-white rounded-lg shadow-lg">
        <div className="text-center pb-2 mb-4 font-bold text-xl border-b-2">{label === "Login"? "User Login" : "User SignUp"}</div>
        <Formfield
          label="Username :"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          error={error.username}
        />
        <Formfield
          label="Email :"
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          error={error.email}
        />
        <button className="w-full py-2 bg-black text-white mt-5 font-bold">Submit</button>

        {label === "Login" && <p className="text-center mt-2 text-sm">Haven't account  
          <button
          onClick={() => navigate("/signup")}
         className="font-medium text-blue-700 hover:text-blue-950 hover:underline hover:cursor-pointer">SignUp</button></p>}
      </form>
    </div>
  );
};

export default Form;
