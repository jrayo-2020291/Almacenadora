import React, { useState, useEffect } from 'react'
import axios from 'axios'
import imgLoading from '../assets/Loading.gif'

export const UserTable = () => {
  const [ users, setUsers] = useState({})
  const [ loading, setLoading ] = useState(true)

  const getUser = async()=>{
    try{
      const { data } = await axios('http://localhost:2631/user/get')
      setUsers(data.users)
      setLoading(false)
    }catch(err){
      console.error(err)
    }
  }

  const deleteUser = async(id)=>{
    try{
      confirmDelete = confirm('¿Estás seguro de eliminar este usuario?')
      if(confirmDelete){
        const { data } = await axios.delete(`http://localhost:2631/user/delete/${id}`)
        getUser()
      }
    }catch(err){
      console.error(err)
      alert(err.response.data.message)
    }
  }

  useEffect(()=> getUser, [])
  if(loading){
    return (
      <img src={imgLoading} alt="Loading..." />
    )
  }
  return (
    <h1>UserTable</h1>
  )
}
