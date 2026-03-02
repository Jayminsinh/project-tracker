import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/userSlice";

function Header() {
    const isAuth = useSelector(state => state.users.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
  return (
    <div className="flex justify-between bg-gray-900 p-2  items-center">
      <h1 className="text-xl text-amber-300 font-bold">Project-Tracker</h1>
      {!isAuth ? navigate("/login") : <div className="flex gap-2 items-center">
       
        <NavLink to="dashboard" className={({isActive}) => isActive? `text-md text-yellow-500 border-b-2 border-yellow-500 text-md` : `text-white text-md hover:text-yellow-200 hover:cursor-pointer`}>Dashboard</NavLink>
        <NavLink to="projects" className={({isActive}) => isActive? `text-md text-yellow-500 border-b-2 border-yellow-500 text-md` : `text-white text-md hover:text-yellow-200 hover:cursor-pointer`}>Projects</NavLink>
      </div> 
      }
      {isAuth && 
      <button onClick={() => dispatch(logoutUser())} className="px-3 py-2 bg-red-900 text-white font-semibold rounded-sm hover:cursor-pointer hover:bg-red-700">Logout</button>
      }
    </div>
  );
}

export default Header;
