import React from 'react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export const AddLeasePage = () => {
  const [users, setUsers] = useState([{}])
  const [storage, setStorage] = useState([{}])
  const navigate = useNavigate()

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


    const addLease = async(e)=>{
        try{
            e.preventDefault()
            let lease = {
              user: document.getElementById('inputUser').value,
              storage: document.getElementById('inputStorage').value,
              description: document.getElementById('description').value,
              month: document.getElementById('date').value,
            }
            const { data } = await axios.post('http://localhost:2651/lease/add', lease,
            {
                headers: {
                    'Authorization': token
                }
            })
            alert(data.message)
            navigate('/dashboard/Lease')
        }catch(err){
            alert(err.response.data.message)
        }
    }
    useEffect(()=> getUsers, [])
    useEffect(()=> getStorage, [])

  return (
    <>
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
                    <input type="Number" placeholder="Arrendamiento" id='date'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-clock"></i>
                    <input type="text" placeholder="Descripcion" id='description'/>
                </div>
                <br/>
                <button onClick={(e)=>  addLease(e)} type="submit" className="btn btn-primary">Add</button>
                <Link to='/dashboard/Lease'>
                <button type="submit" className="btn btn-primary">Cancel</button>
                </Link>
            </form>
        </div>
    </div>
    </>
  )
}
