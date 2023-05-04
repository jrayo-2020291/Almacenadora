import React, { useState, useEffect} from 'react'
import axios from 'axios'
import imgLoading from '../../assets/Loading.gif'
import { Lease } from '../Models/Leases'
import { Link, useNavigate } from 'react-router-dom'

export const LeaseTable = () => {
  const navigate = useNavigate()
  const [lease, setLease] = useState({})
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  const LogOut = ()=>{
		localStorage.clear()
		navigate('/')
	}

  const getLeases = async() =>{
    try{
      const { data } = await axios('http://localhost:2651/lease/get', {
        headers: {
          'Authorization': token
        }
      })
      data.lease.forEach(element=>{
        let date = new Date(element.dueDate)
        element.dueDate = date.toLocaleDateString()
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
					<li onClick={()=>LogOut()}><a >Log Out</a></li>
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
								<th>Descripción</th>
								<th>Fecha de expiración</th>
                <th>Total</th>
								<th>Acciones</th>
							</tr>
						</thead>
							<tbody>
              {
                lease.map(({ _id, user, storage, description, dueDate, total}, index) => {
                  return (
                    <tr key={index}>
                      <Lease
                        user={user?.surname}
                        storage={storage?.name}
                        description={description}
                        dueDate={dueDate}
                        total={total}
                      ></Lease>
                      <td>
                        <Link to={`/../updateLease/${_id}`}>
                          <i className="fa-solid fa-pen-to-square button"></i>
                        </Link>
                          <i onClick={() => deleteLease(_id)} className="fa sharp fa-solid fa-trash button"></i>
                        <Link to={`/../addAService/${_id}`}>
                        <i className='fa-solid fa-clipboard button'></i>
                        </Link>
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
