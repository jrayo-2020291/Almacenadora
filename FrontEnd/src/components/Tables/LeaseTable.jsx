import React, { useState, useEffect} from 'react'
import axios from 'axios'
import imgLoading from '../../assets/Loading.gif'
import { Lease } from '../Models/Leases'
import { Link } from 'react-router-dom'

export const LeaseTable = () => {
  const [lease, setLease] = useState({})
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  const getLeases = async() =>{
    try{
      const { data } = await axios('http://localhost:2651/lease/get', {
        headers: {
          'Authorization': token
        }
      })
      setLease(data.lease)
      setLoading(false)
    }catch(err){
      console.error(err)
    }
  }

  const deleteLease = async(id) =>{
    try{
      let confirmDelete = confirm('Estás seguro de eliminar este Arrendamiento?')
        if(confirmDelete){
          const { data } = await axios.delete(`http://localhost:2651/lease/delete/${id}`, {
            headers: {
              'Authorization': token
            }
          })
          getLeases()
        }
    }catch(err){
      console.error(err)
      alert(err.response.data.message)
    }
  }

  useEffect(()=> getLeases, [])
  if(loading){
    return(
      <img src={imgLoading} alt="Loading..." />
    )
  }
  return (
    <main>
			<h1 className="title">Arrendamiento</h1>
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
          <Link to='/../addLease'>
          <i className="fa-solid fa-plus add"></i>
          </Link>
					<br/>
					<br/>
					<table>
						<thead>
							<tr>
								<th>Usuarios</th>
								<th>Bodegas</th>
								<th>Servicios</th>
								<th>Arrendamiento</th>
								<th>Duración</th>
								<th>Acciones</th>
							</tr>
						</thead>
							<tbody>
              {
                lease.map(({ _id, user, storage, services, description}, index) => {
                  return (
                    <tr key={index}>
                      <Lease
                        user={user}
                        storage={storage}
                        services={services}
                        description={description}
                      ></Lease>
                      <td>
                        ...
                      </td>
                      <td>
                        <Link to={`/../updateLease/${_id}`}>
                          <i className="fa-solid fa-pen-to-square button"></i>
                        </Link>
                        <i onClick={() => deleteLease(_id)} className="fa-sharp fa-solid fa-trash button"></i>
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
  )
}
