import React from 'react'
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"

export const UpdateLeasePage = () => {
  const [lease, setLease] = useState({})
  const { id } = useParams();
  const [storage, setStorage] = useState([{}])
  const token = localStorage.getItem(`token`)
  const navigate = useNavigate()
  const [addressingUrl, setAddressingUrl] = useState('') 
  const role = localStorage.getItem('role')

  const addressing = ()=>{
    if (role === 'ADMIN'){
        setAddressingUrl('/dashboard/Lease')
    } else {
        setAddressingUrl('/worker')
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
  

  const updateLease = async(e)=>{
      try{
        e.preventDefault()
          let updatedLease = {
              storage: document.getElementById('inputStorage').value,   
                 
          }
          console.log(updatedLease.storage)
          const { data } = await axios.put(`http://localhost:2651/lease/update/${id}`, updatedLease,
          {
            headers: {
                'Authorization': token
            }
        })
         alert(`${data.message}`)
         if(role === 'ADMIN'){
            navigate('/dashboard/Lease')
        }else{
            navigate('/worker')
        }
      }catch(err){
          console.error(err)
      }
  }
  useEffect(()=> getLease, [])
  useEffect(()=> getStorage, [])
  useEffect(() =>addressing, [])
 
  return (
<div className="container">
        <div className="box">
            <h1>Arrendamiento</h1>
            <form>
            <div>
                    <i className="fa-solid fa-user-shield icon side">Bodega</i>
                    <select className="form-control" id="inputStorage" required>
                    {
                           storage.map(({_id, name }, i)=>{
                            return (
                                <option key={i} value={_id}>{name}</option>
                            )
                           }) 
                        }
                    </select>
                </div>
                <br/>
                <button onClick={(e)=>  updateLease(e)} type="submit" className="btn btn-outline-primary">Update</button>
                <Link to={addressingUrl}>
                <button type="submit" className="btn btn-outline-primary">Cancel</button>
                </Link>
                
            </form>
        </div>
    </div> 
     )
}
