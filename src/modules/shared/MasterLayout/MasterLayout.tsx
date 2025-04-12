import { useState } from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
export default function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <>
      <NavBar />
    <div className="d-flex">
    {/* Pass collapsed state and toggle function to Sidebar */}
    <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
    {/* Adjust mainContent margin dynamically */}
    <div className={`dark-bg mt-5 pt-3 mainContent ${collapsed ? 'collapsed' : ''}`}>
      <Outlet />
    </div>
  </div>
    </>
  )
}