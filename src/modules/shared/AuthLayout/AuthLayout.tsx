import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {

  return (
<div className="auth-container">
        <div className="vector-rightImg">
        </div>

        <div className="vector-leftImg">
        </div>
    <div><Outlet/></div>
    </div>

  )
}
