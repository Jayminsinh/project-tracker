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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
  >
    <h2 className="text-2xl font-semibold text-gray-800 text-center pb-4 border-b border-gray-200">
      {label === "Login" ? "Welcome Back" : "Create Account"}
    </h2>

    <div className="mt-6 space-y-4">
      <Formfield
        label="Username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        error={error.username}
      />

      <Formfield
        label="Email"
        name="email"
        type="text"
        value={formData.email}
        onChange={handleChange}
        error={error.email}
      />
    </div>

    <button
      type="submit"
      className="w-full mt-6 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition"
    >
      {label === "Login" ? "Login" : "Sign Up"}
    </button>

    {label === "Login" && (
      <p className="text-center mt-5 text-sm text-gray-600">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="text-green-600 font-medium hover:underline"
        >
          Sign Up
        </button>
      </p>
    )}
  </form>
</div>
  );
};

export default Form;
