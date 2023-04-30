import React, { useEffect, useState } from 'react'
import axios from 'axios'
import imgLoading from '../../assets/Loading.gif'
import { A_Service } from '../Models/A_Services'
import { Link } from 'react-router-dom'


export const A_ServicesTable = () => {
  const [services, setServices] = useState({})
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  const getServices = async () => {
    try {
      const { data } = await axios('http://localhost:2651/service/get', {
        headers: {
          'Authorization': token
        }
      })
      setServices(data.services)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }


  useEffect(() => getServices, [])
  if (loading) {
    return (
      <img src={imgLoading} alt='Loading...' />
    )
  }

  return (
    <>
      <main>
        <h1 className="title">Servicios</h1>
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
            <Link to='/../addA_Service'>
            <i className="fa-solid fa-plus add"></i>
            </Link>
            <br />
            <br />
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  services.map(({ _id, name, description, price}, index) => {
                    return (
                      <tr key={index}>
                        <A_Service
                          name={name}
                          description={description}
                          price={price}
                        ></A_Service>
                        <td>
                          <Link to={`/../updateA_Service/${_id}`}>
                            <i className="fa-solid fa-pen-to-square button"></i>
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
    </>
  )
}
