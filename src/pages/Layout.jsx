import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import ProtectedRoutes from "../routes/ProtectedRoutes";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gray-100 overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
