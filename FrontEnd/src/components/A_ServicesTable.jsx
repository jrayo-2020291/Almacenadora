import React, { useEffect, useState } from 'react'
import axios from 'axios'
import imgLoading from '../assets/Loading.gif'


export const A_ServicesTable = () => {
  const [ services, setServices] = useState({})
  const [ loading, setLoading ] = useState(true)

  const getServices = async() =>{
    try{
      const { data } = await axios('http://localhost:2651/service/get')
      setServices(data.services)
      setLoading(false) 
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>getServices, [])
  if(loading){
    return(
      <img src={imgLoading} alt='Loading...'/>
    )
  }
  
  return (
    <h1>A_ServicesTable</h1>
  )
}
