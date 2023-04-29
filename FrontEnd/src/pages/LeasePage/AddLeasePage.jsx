import React from 'react'
import '../../../../FrontEnd/src/Homepage.css'
import axios from "axios"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export const AddLeasePage = () => {
  const [users, setUsers] = useState([{}])

    const title = 'ADD USER'

    const token = localStorage.getItem(`token`)

    const getUsers = async()=>{
      try{
          const { data } = await axios('http://localhost:2651/user/get')
          setUsers(data.users)
      }catch(err){
          console.error(err);
      }
  }

    const addLeasePage = async()=>{
        try{
            let user = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                DPI: document.getElementById('dpi').value,
                email: document.getElementById('gmail').value,
                phone: document.getElementById('phone').value,

            }
            const { data } = await axios.post('http://localhost:2651/lease/add', user,
            {
                headers: {
                    'Authorization': token
                }
            })
            alert(data.message)
        }catch(err){
            alert(err.response.data.message)
        }
    }
    useEffect(()=> getUsers, [])

  return (
    <>
   <meta charSet="UTF-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="./img/favicon.png" type="image/x-icon"/>
    <link rel="stylesheet" href="./css/stylesheet.css"/>
    <script src="https://kit.fontawesome.com/32c2859f80.js" crossOrigin="anonymous"></script>
    <div className="container">
        <div className="box">
            <h1>Arrendamiento</h1>
            <form>
                <div>
                    <i className="fa-solid fa-user-pen icon side"></i>
                    <select className="position">
                        <option value="0" disabled selected>Clientes</option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                    </select>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-user-shield icon side"></i>
                    <select className="size">
                        <option value="0" disabled selected>Bodegas</option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                    </select>
                </div>
                <br/>
                <div className="mb-3">
                    <label htmlFor="inputCategory" className="form-label">User</label>
                    <select className="form-control" id="inputCategory" required>
                        {
                           users.map(({_id, username}, i)=>{
                            return (
                                <option key={i} value={_id}>{username}</option>
                            )
                           }) 
                        }
                    </select>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-book icon side"></i>
                    <input type="text" placeholder="Arrendamiento"/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-clock"></i>
                    <input type="number" placeholder="Duracion"/>
                </div>
                <br/>
                <input type="submit" value="Agregar"/>
            </form>
        </div>
    </div>
    </>
  )
}
