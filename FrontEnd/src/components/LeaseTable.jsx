import React, { useState, useEffect} from 'react'
import axios from 'axios'
import imgLoading from '../assets/Loading.gif'

export const LeaseTable = () => {
  const [lease, setLease] = useState({})
  const [loading, setLoading] = useState(true)

  const getLeases = async() =>{
    try{
      const { data } = await axios('http://localhost:2631/lease/get')
      setLease(data.leases)
      setLoading(false)
    }catch(err){
      console.error(err)
    }
  }

  const deleteLease = async() =>{
    try{
      let confirmDelete = confirm('Estás seguro de eliminar esta Cuenta?')
        if(confirmDelete){
          const { data } = await axios.delete(`http://localhost:2651/lease/delete/${id}`)
          getLeases()
        }
    }catch(err){
      console.error(err)
      alert(err.response.data.message)
    }
  }

  useEffect(()=> getLeases, [])
  if(loading){
    return(
      <img src={imgLoading} alt="Loading..." />
    )
  }
  return (
    <h1>LeaseTable</h1>
  )
}
