import React, { useState, useEffect } from 'react'
import axios from 'axios'
import imgLoading from '../../assets/Loading.gif'
import '../../AppStyle.css'
import { User } from '../Models/Users'
import { Link } from 'react-router-dom'

export const UserTable = () => {
	const [users, setUsers] = useState({})
	const [loading, setLoading] = useState(true)
	const token = localStorage.getItem('token')

	const getUser = async () => {
		try {
			const { data } = await axios('http://localhost:2651/user/get', {
				headers: {
					'Authorization': token
				}
			})
			setUsers(data.users)
			setLoading(false)
		} catch (err) {
			console.error(err)
		}
	}


	const deleteUser = async (id) => {
		try {
			let confirmDelete = confirm('¿Estás seguro de eliminar este usuario?')
			if (confirmDelete) {
				const { data } = await axios.delete(`http://localhost:2651/user/delete/${id}`, {
					headers: {
						'Authorization': token
					}
				})
				getUser()
			}
		} catch (err) {
			console.error(err)
			alert(err.response.data.message)
		}
	}

	useEffect(() => getUser, [])
	if (loading) {
		return (
			<img src={imgLoading} alt="Loading..." />
		)
	}
	return (
		<>
				<main>
					<h1 className="title">Clientes</h1>
					<ul className="breadcrumbs">
						<li><a >Home</a></li>
						<li className="divider">/</li>
						<li><a className="active">Almacenadora</a></li>
					</ul>
					<br />
					<div className="info-data">
						<div className="menu">
							<div className="sub-menu">
							</div>
							<br />
							<Link to='/../addUser'>
							<i className="fa-solid fa-plus add"></i>
							</Link>
							
							<br />
							<br />
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
									{
										users.map(({ _id, name, surname, DPI, email, phone }, index) => {
											return (
												<tr key={index}>
													<User
														name={name}
														surname={surname}
														DPI={DPI}
														email={email}
														phone={phone}
													></User>
													<td>
														<Link to={`/../updateUser/${_id}`}>
															<i className="fa-solid fa-pen-to-square button"></i>
														</Link>
														<i onClick={() => deleteUser(_id)} className="fa sharp fa-solid fa-trash button"></i>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</main>
		</>
	)
}
