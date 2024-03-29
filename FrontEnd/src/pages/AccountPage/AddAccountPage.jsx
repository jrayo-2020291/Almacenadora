import React from 'react'
import '../../../../FrontEnd/src/Homepage.css'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export const AddAccountPage = () => {


    const title = 'ADD Account'
    const navigate = useNavigate()
    const token = localStorage.getItem(`token`)

    const addAccount = async()=>{
        try{
            let account = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
            }
            const { data } = await axios.post('http://localhost:2651/account/register', account, {
                headers: {
                    'Authorization': token
                }
            })
            alert(data.message)
            navigate('/dashboard/Account')
        }catch(err){
            alert(err.response.data.message)
        }
    }
  return (
    <>
   <meta charSet="UTF-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="../assets/favicon.png" type="image/x-icon"/>
    <script src="https://kit.fontawesome.com/32c2859f80.js" crossOrigin="anonymous"></script>
    <div className="container">
        <div className="box">
            <h1>Empleados</h1>
            <form>
                <div>
                    <i className="fa-solid fa-user"></i>
                    <input type="text" placeholder="name" id='name'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-user-clock"></i>
                    <input type="text" placeholder="surname" id='surname'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-id-card"></i>
                    <input type="tel" placeholder="username" id='username'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="password" id='password'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-phone"></i>
                    <input type="tel" placeholder="email" id='email'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-user"></i>
                    <input type="tel" placeholder="phone" id='phone'/>
                </div>
                <br/>
                <button onClick={()=>  addAccount()} type="submit" className="btn btn-primary">Add</button>
                <Link to='/dashboard/Account'>
                <button type="submit" className="btn btn-primary">Cancel</button>
                </Link>
            </form>
        </div>
    </div>
    </>
  )
}
