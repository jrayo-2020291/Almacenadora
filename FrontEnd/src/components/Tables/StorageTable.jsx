import React, { useState, useEffect } from 'react'
import axios from 'axios'
import imgLoading from '../../assets/Loading.gif'
import { Storage } from '../Models/Storages'
import { Link } from 'react-router-dom'

export const StorageTable = () => {
  const [storage, setStorage] = useState({})
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  const getStorages = async () => {
    try {
      const { data } = await axios('http://localhost:2651/storage/get', {
        headers: {
          'Authorization': token
        }
      })
      setStorage(data.storages)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }

  }

  const deleteStorage = async (id) => {
    try {
      let confirmDelete = confirm('¿Estás seguro de eliminar esta bodega')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:2651/storage/delete/${id}`, {
					headers: {
						'Authorization': token
					}
				})
        getStorages()
      }
    } catch (err) {
      console.error(err)
      alert(err.responde.data.message)
    }
  }

  useEffect(() => getStorages, [])
  if (loading) {
    return (
      <img src={imgLoading} alt="Loading..." />
    )
  }
  return (
    <main>
      <h1 className="title">Bodegas</h1>
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
          <Link to='/../addStorage'>
          <i className="fa-solid fa-plus add"></i>
          </Link>
          <br />
          <br />
          <table>
            <thead>
              <tr>
                <th>Bodega</th>
                <th>Ubicación</th>
                <th>Tamaño</th>
                <th>Disponibilidad</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                storage.map(({ _id, name, description, location, size, availability, monthlyPrice}, index) => {
                  return (
                    <tr key={index}>
                      <Storage
                        name={name}
                        description={description}
                        location={location}
                        size={size}
                        availability={availability}
                        monthlyPrice={monthlyPrice}
                      ></Storage>
                      <td>
                        <Link to={`/../updateStorage/${_id}`}>
                          <i className="fa-solid fa-pen-to-square button"></i>
                        </Link>
                        <i onClick={() => deleteStorage(_id)} className="fa-sharp fa-solid fa-trash button"></i>
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
