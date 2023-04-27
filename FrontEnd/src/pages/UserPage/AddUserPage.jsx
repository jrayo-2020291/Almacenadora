import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

export const AddUserPage = () => {
    const [form, setForm] = useState({
      name: '',
      surname: '',
      DPI: '',
      email: '',
      phone: ''
    }) 

    const handleChange = (e)=>{
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }

    const add = async(e) =>{
      try{
        e.preventDefault()
        const { data } = await axios.post('http://localhost:2621/user/add', form)
        alert(data.message)
        return <Navigate to='/dashboard/User'/>
      }catch(err){
        console.error(err)
        alert(err.response.data.message)
      }
    }

  return (
    <h1>AddUserPage</h1>
  )
}
