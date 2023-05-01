import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import React from 'react'

export const UpdateAccountPage = () =>{
    const [account, setAccount] = useState({})
    const { id } = useParams();
    const token = localStorage.getItem(`token`)
    const navigate = useNavigate()


    const getAccount = async()=>{
        try{
            const { data } = await axios(`http://localhost:2651/account/get/${id}`, {
              headers: {
                  'Authorization': token
              }
          })
            setAccount(data.existAccount)
        }catch(err){
            console.error(err)
        }
    }
    


    const updateAccount = async(e)=>{
        try{
            e.preventDefault()
            let updatedAccount = {
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                username: document.getElementById('inputUsername').value,
                email: document.getElementById('inputEmail').value,
                phone: document.getElementById('inputPhone').value
                
            }
            const { data } = await axios.put(`http://localhost:2651/account/update/${id}`, updatedAccount , {
              headers: {
                  'Authorization': token
              }
          })
           alert(`${data.message} `)
           navigate('/dashboard/Account')
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=> getAccount, [])
   
  return (
    <div className="container">
        <div className="box">
            <h1>Empleado</h1>
            <form>
                <div>
                    <i className="fa-solid fa-user"></i>
                    <input defaultValue={account.name} type="text" placeholder="name" className="form-control" id="inputName" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-user-clock"></i>
                    <input defaultValue={account.surname} type="text" placeholder="surname" className="form-control" id="inputSurname" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-users"></i>
                    <input defaultValue={account.username} type="text" placeholder="username" className="form-control" id="inputUsername" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-lock"></i>
                    <input defaultValue={account.email} type="text" placeholder="email" className="form-control" id="inputEmail" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-envelope"></i>
                    <input defaultValue={account.phone} type="text" placeholder="phone" className="form-control" id="inputPhone" required/>
                </div>
                <br/>
                <button onClick={(e)=>  updateAccount(e)} type="submit" className="btn btn-outline-primary">Update</button>
                <Link to='/dashboard/Account'>
                <button type="submit" className="btn btn-outline-primary">Cancel</button>
                </Link>

            </form>
        </div>
    </div>
  )
}
