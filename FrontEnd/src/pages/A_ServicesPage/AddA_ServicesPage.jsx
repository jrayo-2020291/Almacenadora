import React from 'react'
import '../../App.css' 
import axios from "axios"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export const AddA_ServicesPage = () => {

    const title = 'ADD SERVICE'

    const addService = async()=>{
        try{
            let service = {
                name: document.getElementById('name').value,
                price: document.getElementById('price').value,
                description: document.getElementById('description').value,
            }
            const { data } = await axios.post('http://localhost:2651/service/add', service)
            alert(data.message)
        }catch(err){
            alert(err.response.data.message)
        }
    }
  return (
    <>
   <meta charSet="UTF-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="../assets/favicon.png" type="image/x-icon"/>
    <script src="https://kit.fontawesome.com/32c2859f80.js" crossOrigin="anonymous"></script>
    <div className="container">
        <div className="box">
            <h1>Servicio</h1>
            <form>
                <div>
                    <i className="fa-solid fa-user"></i>
                    <input type="text" placeholder="Nombre" id='name'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-pencil"></i>
                    <input type="text" placeholder="Descripción" id='description'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-tag"></i>
                    <input type="number" placeholder="Precio" id='price'/>
                </div>
                <br/>
                <button onClick={()=>  addService()} type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    </div>
    </>
  )
}
