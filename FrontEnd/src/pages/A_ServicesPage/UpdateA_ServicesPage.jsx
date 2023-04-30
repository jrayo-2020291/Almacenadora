import React from 'react'
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"


export const UpdateA_ServicesPage = () => {
  const [service, setService] = useState({})
  const { id } = useParams();
  
  const getService = async()=>{
    try{
        const { data } = await axios(`http://localhost:2651/service/find/${id}`)
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
    <>
    <meta charSet="UTF-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="./img/favicon.png" type="image/x-icon"/>
    <link rel="stylesheet" href="./css/stylesheet.css"/>
    <script src="https://kit.fontawesome.com/32c2859f80.js" crossOrigin="anonymous"></script>
    <div className="container">
        <div className="box">
            <h1>Servicio</h1>
            <form>
                <div>
                    <i className="fa-solid fa-user"></i>
                    <input defaultValue={service.name} type="text" className="form-control" id="inputName" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-pencil"></i>
                    <input defaultValue={service.description} type="text" className="form-control" id="inputDescription" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-tag"></i>
                    <input defaultValue={service.price} type="number" className="form-control" id="inputPrice" required/>
                </div>
                <br/>
                <button onClick={()=>  updateService()} type="submit" className="btn btn-outline-primary">Update</button>
            </form>
        </div>
    </div>
     </>
  )
}
