import React, { useState, useEffect } from 'react'
import axios from 'axios'
import imgLoading from '../assets/Loading.gif'
import '../AppStyle.css'
import img1 from '../assets/favicon.png'

export const UserTable = () => {
const [ users, setUsers] = useState({})
const [ loading, setLoading ] = useState(true)

const getUser = async()=>{
try{
  const { data } = await axios('http://localhost:2631/user/get')
  setUsers(data.users)
  setLoading(false)
}catch(err){
  console.error(err)
}
}

const deleteUser = async(id)=>{
try{
  confirmDelete = confirm('¿Estás seguro de eliminar este usuario?')
  if(confirmDelete){
    const { data } = await axios.delete(`http://localhost:2631/user/delete/${id}`)
    getUser()
  }
}catch(err){
  console.error(err)
  alert(err.response.data.message)
}
}

useEffect(()=> getUser, [])
if(loading){
return (
  <img src={imgLoading} alt="Loading..." />
)
}
  return (
    <>

    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href={img1} type="image/x-icon"/>
    <script src="https://kit.fontawesome.com/32c2859f80.js" crossorigin="anonymous"></script>
    <title>Clientes</title>

    <section>
    <main>
			<h1 classNameName="title">Clientes</h1>
				<ul className="breadcrumbs">
					<li><a >Home</a></li>
					<li className="divider">/</li>
					<li><a  className="active">Almacenadora</a></li>
				</ul>
			<br/> 
			<div className="info-data">
				<div className="menu">
					<div className="sub-menu">
					</div>
					<br/>
					<a href="./add-customer.html"><i className="fa-solid fa-plus add"></i></a>
					<br/>
					<br/>
					<table>
						<thead>
							<tr>
								<th>Nombre</th>
								<th>Apellido</th>
								<th>DPI</th>
								<th>Gmail</th>
								<th>Telefono</th>
								<th>Acciones</th>
							</tr>
						</thead>
							<tbody>
								<tr>
									<td>Alexandra</td>
									<td>Puerto</td>
									<td>4102-58621-2569</td>
									<td>alexandrapue@gmail.com</td>
									<td>8562-9656</td>
									<td>
										<a href="./update-customer.html" className=""><i className="fa-solid fa-pen-to-square button"></i></a>
										<a  className=""><i className="fa-sharp fa-solid fa-trash button"></i></a>
									</td>
								</tr>
								<tr>
									<td>Alexandra</td>
									<td>Puerto</td>
									<td>4102-58621-2569</td>
									<td>alexandrapue@gmail.com</td>
									<td>8562-9656</td>
									<td>
										<a href="./update-customer.html" className=""><i className="fa-solid fa-pen-to-square button"></i></a>
										<a  className=""><i className="fa-sharp fa-solid fa-trash button"></i></a>
									</td>
								</tr>
								<tr>
									<td>Alexandra</td>
									<td>Puerto</td>
									<td>4102-58621-2569</td>
									<td>alexandrapue@gmail.com</td>
									<td>8562-9656</td>
									<td>
										<a href="./update-customer.html" className=""><i className="fa-solid fa-pen-to-square button"></i></a>
										<a  className=""><i className="fa-sharp fa-solid fa-trash button"></i></a>
									</td>
								</tr>
								<tr>
									<td>Alexandra</td>
									<td>Puerto</td>
									<td>4102-58621-2569</td>
									<td>alexandrapue@gmail.com</td>
									<td>8562-9656</td>
									<td>
										<a href="./update-customer.html" className=""><i className="fa-solid fa-pen-to-square button"></i></a>
										<a  className=""><i className="fa-sharp fa-solid fa-trash button"></i></a>
									</td>
								</tr>
								<tr>
									<td>Alexandra</td>
									<td>Puerto</td>
									<td>4102-58621-2569</td>
									<td>alexandrapue@gmail.com</td>
									<td>8562-9656</td>
									<td>
										<a href="./update-customer.html" className=""><i className="fa-solid fa-pen-to-square button"></i></a>
										<a  className=""><i className="fa-sharp fa-solid fa-trash button"></i></a>
									</td>
								</tr>
							</tbody>
						</table>
				   </div> 
				</div> 
		</main>
	</section>
  </>
  )
}
