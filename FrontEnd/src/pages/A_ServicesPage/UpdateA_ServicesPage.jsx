import React from 'react'
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"


export const UpdateA_ServicesPage = () => {
  const [service, setService] = useState({})
  const { id } = useParams();
  const token = localStorage.getItem(`token`)

  
  const getService = async()=>{
    try{
        const { data } = await axios(`http://localhost:2651/service/get/${id}` ,{
            headers: {
                'Authorization': token
            }
        })
        setService(data.service)
    }catch(err){
        console.error(err)
    }
}



const updateService = async()=>{
    try{
        let updatedService = {
            name: document.getElementById('inputName').value,
            description: document.getElementById('inputDescription').value,
            price: document.getElementById('inputPrice').value,
        }
        const { data } = await axios.put(`http://localhost:2651/service/update/${id}`, updatedService)
       alert(`${data.message} ${data.updatedService.name}`)
       
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
                    <input  type="text" defaultValue={service && service.name} className="form-control" placeholder='New Name' id="inputName" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-pencil"></i>
                    <input  type="text" defaultValue={service && service.description}className="form-control" id="inputDescription" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-tag"></i>
                    <input  type="number"defaultValue={service && service.price} className="form-control" id="inputPrice" required/>
                </div>
                <br/>
                <button onClick={()=>  updateService()} type="submit" className="btn btn-outline-primary">Update</button>
            </form>
        </div>
    </div>
  )
}
