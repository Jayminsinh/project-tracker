import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import ProtectedRoutes from "../routes/ProtectedRoutes";

function Layout() {
  return (
    <div className='max-h-screen'>
      <Header/>
      <Outlet />
    </div>
  )
}

export default Layout
