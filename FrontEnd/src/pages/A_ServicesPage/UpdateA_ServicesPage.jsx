import React from 'react'
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"


export const UpdateA_ServicesPage = () => {
  const [service, setService] = useState({})
  const { id } = useParams();
  const token = localStorage.getItem(`token`)
  const navigate = useNavigate()

  
  const getService = async()=>{
    try{
        const { data } = await axios(`http://localhost:2651/service/get/${id}` ,{
            headers: {
                'Authorization': token
            }
        })
        setService(data.existService)
    }catch(err){
        console.error(err)
    }
}



const updateService = async(e)=>{
    try{
        e.preventDefault()
        let updatedService = {
            name: document.getElementById('inputName').value,
            description: document.getElementById('inputDescription').value,
            price: document.getElementById('inputPrice').value,
        }
        const { data } = await axios.put(`http://localhost:2651/service/update/${id}`, updatedService)
       alert('Service Updated')
       navigate('/dashboard/A_Services')
    }catch(err){
        console.error(err)
    }
}
useEffect(()=> getService, [])
  return (
   
    <div className="container">
        <div className="box">
            <h1>Servicio</h1>
            <form>
                <div>
                    <i className="fa-solid fa-user"></i>
                    <input  type="text" defaultValue={service.name} className="form-control" placeholder='New Name' id="inputName" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-pencil"></i>
                    <input  type="text" defaultValue={service.description}className="form-control" id="inputDescription" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-tag"></i>
                    <input  type="number"defaultValue={service.price} className="form-control" id="inputPrice" required/>
                </div>
                <br/>
                <button onClick={(e)=>  updateService(e)} type="submit" className="btn btn-outline-primary">Update</button>
                <Link to='/dashboard/A_Services'>
                <button type="submit" className="btn btn-outline-primary">Cancel</button>
                </Link>
            </form>
        </div>
    </div>
  )
}
