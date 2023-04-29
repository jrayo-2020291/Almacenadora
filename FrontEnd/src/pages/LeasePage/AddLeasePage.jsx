import React from 'react'
import '../../../../FrontEnd/src/Homepage.css'
import axios from "axios"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export const AddLeasePage = () => {
  const [users, setUsers] = useState([{}])
  const [services, setServices] = useState([{}])
  const [storage, setStorage] = useState([{}])


    const title = 'ADD USER'

    const token = localStorage.getItem(`token`)

    const getUsers = async()=>{
      try{
          const { data } = await axios('http://localhost:2651/user/get' ,
          {
              headers: {
                  'Authorization': token
              }
          })
          setUsers(data.users)
      }catch(err){
          console.error(err);
      }
  }
  const getStorage = async()=>{
    try{
        const { data } = await axios('http://localhost:2651/storage/get' ,
        {
            headers: {
                'Authorization': token
            }
        })
        setStorage(data.storages)
    }catch(err){
        console.error(err);
    }
}

  const getServices = async()=>{
    try{
        const { data } = await axios('http://localhost:2651/service/get' )
        setServices(data.services)
    }catch(err){
        console.error(err);
    }
}
    const addLease = async()=>{
        try{
            let lease = {
              user: document.getElementById('inputUser').value,
              storage: document.getElementById('inputStorage').value,
              description: document.getElementById('description').value,
              dueDate: document.getElementById('date').value,
              rentalDate: document.getElementById('time').value,

            }
            const { data } = await axios.post('http://localhost:2651/lease/add', lease,
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
    useEffect(()=> getServices, [])
    useEffect(()=> getStorage, [])

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
                    <i className="fa-solid fa-user-shield icon side">Cliente</i>
                    <select className="form-control" id="inputUser" required>
                     {
                           users.map(({_id, name}, i)=>{
                            return (
                                <option key={i} value={_id}>{name}</option>
                            )
                           }) 
                        }
                    </select>
                </div>
                <br/>

                <div>
                    <i className="fa-solid fa-user-shield icon side">Bodega</i>
                    <select className="form-control" id="inputStorage" required>
                    {
                           storage.map(({_id, name}, i)=>{
                            return (
                                <option key={i} value={_id}>{name}</option>
                            )
                           }) 
                        }
                    </select>
                </div>
                <br/>
                
                <br/>
                <div>
                    <i className="fa-solid fa-book icon side"></i>
                    <input type="date" placeholder="Arrendamiento" id='date'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-clock"></i>
                    <input type="date" placeholder="Duracion" id='time'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-clock"></i>
                    <input type="text" placeholder="Descripcion" id='description'/>
                </div>
                <br/>
                <button onClick={()=>  addLease()} type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    </div>
    </>
  )
}
