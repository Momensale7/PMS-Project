import {useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import { menuItems, SideBarProps } from "../../Interfaces/layout";
import { Authcontext } from "../../AuthContext/AuthContext";
import ChangePass from "../../Authentication/ChangePass/ChangePass";



export default function SideBar({ collapsed, setCollapsed }: SideBarProps) {
  const authContext = useContext(Authcontext)
  const role = authContext?.role
  const [showchangePass, setShowChangePass] = useState(false)
  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const menuItems: menuItems[] = [
    { to: "/dashboard", icon: "fa-home", label: "Home" },
    { to: "users", icon: "fa-users", label: "Users", showOnlyFor: "Manager" },
    { to: "projects", icon: "fa-folder", label: "Projects" },
    { to: "tasks", icon: "fa-tasks", label: "Tasks" },
  ];
  const filteredMenuItems = menuItems.filter(item => {
    if (item.showOnlyFor && role) {
      return item.showOnlyFor === role;
    }
    return true;
  });
  return (
    <>
      <div className="sidebarContainer  ">
        <Sidebar collapsed={collapsed} className='' >
          <div className="d-flex justify-content-end ">
            <Button
              className={`${collapsed ? 'btnCollapsed' : ''} btn btn-sm d-flex align-items-center justify-content-center bgMain my-3 btnToggle text-white`}
              onClick={toggleCollapse}
              aria-label="Toggle Sidebar"
            >
              <i className="fa fa-chevron-left"></i>
            </Button>
          </div>
          <Menu className={`${collapsed ? 'px-0 mt-6' : 'px-3'}`}>
            {filteredMenuItems.map((item, index) => (
              <MenuItem key={index} className='mb-3' icon={<i className={`fa ${item.icon} text-white`}></i>} component={showchangePass ? <Link to={item.to} className='text-white' /> : <NavLink end to={item.to} className='text-white' />}>
                {item.label}
              </MenuItem>
            ))}
            <MenuItem onClick={() => {
              setShowChangePass(true)
            }}
              icon={<i className='fa  fa-lock text-white'></i>}
              className={`text-white ${showchangePass ? "active" : ""}`}
            >Change Password</MenuItem>
          </Menu>
        </Sidebar>
      </div>
      <ChangePass show={showchangePass} onClose={() => setShowChangePass(false)} />
    </>
  )
}
