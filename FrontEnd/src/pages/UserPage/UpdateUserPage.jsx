import React from 'react'
import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"

export const UpdateUserPage = () => {
  const [user, setUser] = useState({})
    const { id } = useParams();
    const token = localStorage.getItem(`token`)
    const navigate = useNavigate()


    const getUser = async()=>{
        try{
            const { data } = await axios(`http://localhost:2651/user/get/${id}`, {
              headers: {
                  'Authorization': token
              }
          })
            setUser(data.user)
        }catch(err){
            console.error(err)
        }
    }
    

    const updateUser = async(e)=>{
        try{
            e.preventDefault()
            let updatedUser = {
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                DPI: document.getElementById('inputDpi').value,
                email: document.getElementById('inputEmail').value,
                phone: document.getElementById('inputPhone').value,
                
            }
            const { data } = await axios.put(`http://localhost:2651/user/update/${id}`, updatedUser , {
              headers: {
                  'Authorization': token
              }
          })
           alert(`${data.message} ${data.updatedUser.name}`)
          navigate('/dashboard/User')
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=> getUser , [])
    console.log(user)

   
  return (
    <div className="container">
    <div className="box">
        <h1>Cliente</h1>
        <form>
            <div>
                <i className="fa-solid fa-user"></i>
                <input defaultValue={user.name} type="text" placeholder="name" className="form-control" id="inputName" required/>
            </div>
            <br/>
            <div>
                <i className="fa-solid fa-user-clock"></i>
                <input defaultValue={user.surname} type="text" placeholder="surname" className="form-control" id="inputSurname" required/>
            </div>
            <br/>
            <div>
                <i className="fa-solid fa-id-card"></i>
                <input defaultValue={user.DPI} type="text" placeholder="dpi" className="form-control" id="inputDpi" required/>
            </div>
            <br/>
            <div>
                <i className="fa-solid fa-envelope"></i>
                <input defaultValue={user.email} type="text" placeholder="email" className="form-control" id="inputEmail" required/>
            </div>
            <br/>
            <div>
                <i className="fa-solid fa-phone"></i>
                <input defaultValue={user.phone} type="text" placeholder="phone" className="form-control" id="inputPhone" required/>
            </div>
            <br/>
            <button onClick={(e)=>  updateUser(e)} type="submit" className="btn btn-outline-primary">Update</button>
            <Link to='/dashboard/User'>
            <button  type="submit" className="btn btn-outline-primary">Cancel</button>
            </Link>
            
        </form>
    </div>
</div>
  )
}
