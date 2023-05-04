import React, { useState, useEffect } from 'react'
import axios from 'axios'
import imgLoading from '../../assets/Loading.gif'
import { Account } from '../Models/Accounts'
import { Link, useNavigate } from 'react-router-dom'
import '../../AppStyle.css'

export const AccountTable = () => {
  const navigate = useNavigate()
  const [account, setAccount] = useState({})
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  const LogOut = ()=>{
		localStorage.clear()
		navigate('/')
	}

  const getAccounts = async () => {
    try {
      const { data } = await axios('http://localhost:2651/account/get', {
        headers: {
          'Authorization': token
        }
      })
      setAccount(data.accounts)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteAccount = async (id) => {
    try {
      let confirmDelete = confirm('Estás seguro de eliminar esta Cuenta?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:2651/account/delete/${id}`, {
          headers: {
              'Authorization': token
          }
      })
        getAccounts()
      }
    } catch (err) {
      console.error(err)
      alert(err.response.data.message)
    }
  }

  useEffect(() => getAccounts, [])
  if (loading) {
    return (
      <img src={imgLoading} alt="Loading..." />
    )
  }

  return (
    <>
      <main>
        <h1 className="title">Empleados</h1>
        <ul className="breadcrumbs">
          <li onClick={()=>LogOut()}><a >Log Out</a></li>
          <li className="divider">/</li>
          <li><a className="active">Almacenadora</a></li>
        </ul>
        <br />
        <div className="info-data">
          <div className="menu">
            <div className="sub-menu">
            </div>
            <br />
            <Link to='/../addAccount'>
            <i className="fa-solid fa-plus add"></i>
            </Link>
            <br />
            <br />
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Usuario</th>
                  <th>Gmail</th>
                  <th>Telefono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  account.map(({ _id, name, surname, username, email, phone}, index) => {
                    return (
                      <tr key={index}>
                        <Account
                          name={name}
                          surname={surname}
                          username={username}
                          email={email}
                          phone={phone}
                        ></Account>
                        <td>
                          <Link to={`/../updateAccount/${_id}`}>
                            <i className="fa-solid fa-pen-to-square button"></i>
                          </Link>
                            <i onClick={()=>deleteAccount(_id)}className="fa sharp fa-solid fa-trash button"></i>
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
