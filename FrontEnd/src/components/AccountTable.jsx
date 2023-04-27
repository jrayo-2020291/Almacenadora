import React, { useState, useEffect} from 'react'
import axios from 'axios'
import imgLoading from '../assets/Loading.gif'

export const AccountTable = () => {
  const [ account, setAccount ] = useState({})
  const [ loading, setLoading ] = useState(true)

  const getAccounts = async()=>{
    try{
      const { data } = await axios('http://localhost:2651/account/get')
      setAccount(data.accounts)
      setLoading(false)
    }catch(err){
      console.error(err)
    }
  }

  const deleteAccount = async(id)=>{
    try{
      let confirmDelete = confirm('Estás seguro de eliminar esta Cuenta?')
        if(confirmDelete){
          const { data } = await axios.delete(`http://localhost:2651/account/delete/${id}`)
          getAccounts()
        }
    }catch(err){
      console.error(err)
      alert(err.response.data.message)
    }
  }

  useEffect(()=> getAccounts, [])
  if(loading){
    return(
      <img src={imgLoading} alt="Loading..." />
    )
  }

  return (
    <h1>AccountTable</h1>
  )
}
