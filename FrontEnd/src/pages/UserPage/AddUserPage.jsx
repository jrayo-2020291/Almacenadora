import React from 'react'
import '../../../../FrontEnd/src/Homepage.css'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export const AddUserPage = () => {
    const navigate = useNavigate()
    const title = 'ADD USER'
    const token = localStorage.getItem(`token`)


    const addUser = async()=>{
        try{
            let user = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                DPI: document.getElementById('dpi').value,
                email: document.getElementById('gmail').value,
                phone: document.getElementById('phone').value,

            }
            const { data } = await axios.post('http://localhost:2651/user/add', user,
            {
                headers: {
                    'Authorization': token
                }
            })
            alert(data.message)
            navigate('/dashboard/User')
        }catch(err){
            alert(err.response.data.message)
        }
    }
  return (
    <>
    <div className="container">
        <div className="box">
            <h1>Cliente</h1>
            <form>
                <div>
                    <i className="fa-solid fa-user"></i>
                    <input type="text" placeholder="name" id='name'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-user-clock"></i>
                    <input type="text" placeholder="lastname" id='surname'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-id-card"></i>
                    <input type="tel" placeholder="dpi" id='dpi'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="gmail" id='gmail'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-phone"></i>
                    <input type="tel" placeholder="phone" id='phone'/>
                </div>
                <br/>
                <button onClick={()=>  addUser()} type="submit" className="btn btn-primary">Add</button>
                <Link to='/dashboard/User'>
                <button  type="submit" className="btn btn-primary">Cancel</button>
                </Link>
                
            </form>
        </div>
    </div>
    </>
  )
}
