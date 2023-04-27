import React, { useState, useEffect } from 'react'
import axios from 'axios'
import imgLoading from '../assets/Loading.gif'

export const StorageTable = () => {
  const [ storage, setStorage ] = usesState({})
  const [ loading, setLoading ] = useState(true)

  const getStorages = async()=>{
    try{
      const { data } = await axios('http://localhost:2631/storage/get')
      setStorage(data.storages)
      setLoading(false)
    }catch(err){
      console.error(err)
    }

  }

  const deleteStorage = async(id)=>{
    try{
      let confirmDelete = confirm('¿Estás seguro de eliminar esta bodega')
      if(confirmDelete){
        const { data } = await axios(`http://localhost:2631/storage/delete/${id}`)
        getStorages()
      }
    }catch(err){
      console.error(err)
      alert(err.responde.data.message)
    }
  }

  useEffect(()=> getStorages, [])
  if(loading){
    return(
      <img src={imgLoading} alt="Loading..." />
    )
  }
  return (
    <h1>StorageTable</h1>
  )
}
