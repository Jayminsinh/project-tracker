import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/userSlice";

function Header() {
  const isAuth = useSelector(state => state.users.isAuth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/")
  }

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white border-b border-gray-200 shadow-sm">

      <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
        Project Tracker
      </h1>

      {isAuth && (
        <div className="flex items-center gap-6">

          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-medium text-green-600 border-b-2 border-green-600 pb-1"
                : "text-sm font-medium text-gray-600 hover:text-green-600 transition"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="projects"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-medium text-green-600 border-b-2 border-green-600 pb-1"
                : "text-sm font-medium text-gray-600 hover:text-green-600 transition"
            }
          >
            Projects
          </NavLink>

          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
          >
            Logout
          </button>

        </div>
      )}
    </div>
  );
}

export default Header;
