import React from 'react'
import { Outlet } from 'react-router-dom'
import '../AppStyle.css'
// import '../AppScript.js'
import img1 from '../assets/favicon.png'
import img2 from '../assets/storage.png'
import img3 from '../assets/admin.png'



export const DashBoardPage =() => {
  return (
   <>
    <meta charSet="UTF-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script src="https://kit.fontawesome.com/32c2859f80.js" crossOrigin="anonymous"></script>
    <script src="../AppScript" async></script>
    <title>Clientes</title>

    <section id="sidebar">
		<a  className="brand"><img src={img2} className="img"/>Robbins</a>
		<ul className="side-menu">
			<li><a  className="active"><i className="fa-solid fa-house icon"></i>Administrador</a></li>
			<li className="divider" data-text="Principal">Principal</li>
			<li><i className="fa-solid fa-user-pen icon side"></i>Clientes</li>
			<li><a href="./cellars.html"><i className="fa-solid fa-user-shield icon side"></i>Bodegas</a></li>
			<li><a href="./employees.html"><i className="fa-solid fa-user-gear icon side"></i>Empleados</a></li>
			<li><a href="./services.html"><i className="fa-solid fa-user-tag icon side"></i>Servicios</a></li>
			<li><a href="./lease.html"><i className="fa-solid fa-book icon side"></i>Arendamiento</a></li>
    </ul>
	</section>

	<section id="content">
		<header>
			<nav>
				<i className="fa-solid fa-bars toggle-sidebar side"></i>
				<form action="#">
					<div className="form-group">
						<input type="text" placeholder="Buscar..."/>
						<i className="fa-solid fa-magnifying-glass icon"></i>
					</div>
				</form>
				<div className="profile">
					<img src={img3}/>
					<ul className="profile-link">
						<li><a ><i className="fa-solid fa-user icon side"></i>Perfil</a></li>
						<li><a ><i className="fa-solid fa-envelope icon side"></i>Notificaciones</a></li>
						<li><a ><i className="fa-solid fa-gear icon side"></i>Configuración</a></li>
						<li><a href="./index.html"><i className="fa-solid fa-right-from-bracket icon side"></i>Cerrar Sesión</a></li>
					</ul>
				</div>
			</nav>
		</header>
    </section>
    <Outlet></Outlet>
    <script src='../AppScript.js'></script>
    </>
  )
}
