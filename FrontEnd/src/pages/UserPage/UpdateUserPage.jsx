import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import imgLoading from '../../assets/Loading.gif'

export const UpdateUserPage = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    DPI: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const { id } = useParams()

  const getUser = async()=>{
    try{
      const { data } = await axios(`http://localhost:2651/user/get/${id}`)
      setUser(data.user)
      setLoading(false)
    }catch(err){
      console.error(err)
    }
  }
  const handleChange = ()=>{
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    })
  }

  const update = async(e)=>{
    try{
      e.preventDefault()
      const { data } = await axios.put(`http://localhost:2651/user/update/${id}`)
      alert(data.message)
      return <Navigate to='/dashboard/User'/>
    }catch(err){
      console.error(err)
      alert(err.response.data.message)
    }
  }

  useEffect(()=> getProduct, [])
  if(loading){
    return(
      <img src={imgLoading} alt='Loading...'/>
    )
  }
  return (
    <h1>UpdateUserPage</h1>
  )
}
