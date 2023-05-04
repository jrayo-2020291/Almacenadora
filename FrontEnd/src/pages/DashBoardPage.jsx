import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import '../AppStyle.css'
import '../navbar.css'
// import '../AppScript.js'
import img1 from '../assets/storage.png'
import { Link, useNavigate } from 'react-router-dom'




export const DashBoardPage =() => {
  return (
   <>
    <nav>
        <div><img src={img1} className="logo"/></div>
        <input type="checkbox" id="click"/>
        <label htmlFor="click" className="menu-btn"><i className="fas fa-bars"></i></label>
        <ul>
			<Link to='/dashboard/User'>
			<li>Clientes</li>
			</Link>
			<Link to='/dashboard/Storage'>
			<li>Bodegas</li>
			</Link>
			<Link to='/dashboard/Account'>
			<li>Empleados</li>
			</Link>
			<Link to='/dashboard/A_Services'>
			<li>Servicios</li>
			</Link>
			<Link to='/dashboard/Lease'>
			<li>Arrendamiento</li>
			</Link>
        </ul>
    </nav>
    <Outlet></Outlet>
    </>	
  )
}
