import React from 'react'
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

export const UpdateLeasePage = () => {
  const [lease, setLease] = useState({})
  const { id } = useParams();
  const token = localStorage.getItem(`token`)

  const getLease = async()=>{
      try{
          const { data } = await axios(`http://localhost:2651/lease/get/${id}`,{
            headers: {
                'Authorization': token
            }
        })
          setLease(data.lease)
      }catch(err){
          console.error(err)
      }
  }
  

  const updateLease = async()=>{
      try{
          let updatedLease = {
              description: document.getElementById('description').value,
              rentalDate: document.getElementById('date').value,      
          }
          const { data } = await axios.put(`http://localhost:2651/lease/update/${id}`, updatedLease,
          {
            headers: {
                'Authorization': token
            }
        })
         alert(`${data.message} ${data.updatedLease.name}`)
         
      }catch(err){
          console.error(err)
      }
  }
  useEffect(()=> getLease, [])

 
  return (
<div className="container">
        <div className="box">
            <h1>Arrendamiento</h1>
            <form>
                <div>
                    <i className="fa-solid fa-user-pen icon side"></i>
                    <input type="date" defaultValue={lease.rentalDate}placeholder="Duracion" id='date'/>
                </div>
                <br/>    
                <div>
                    <i className="fa-solid fa-book icon side"></i>
                    <input type="text" defaultValue={lease.description}placeholder="Descripcion" id='description'/>
                </div>
                <br/>
                <br/>
                <button onClick={()=>  updateLease()} type="submit" className="btn btn-outline-primary">Update</button>
            </form>
        </div>
    </div> 
     )
}
