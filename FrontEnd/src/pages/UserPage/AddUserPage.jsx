import React from 'react'
import '../../../../FrontEnd/src/Homepage.css'
import axios from "axios"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export const AddUserPage = () => {

    const title = 'ADD USER'

    const addUser = async()=>{
        try{
            let user = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                dpi: document.getElementById('dpi').value,
                email: document.getElementById('gmail').value,
                phone: document.getElementById('phone').value,

            }
            const { data } = await axios.post('http://localhost:2651/user/add', user)
            alert(data.message)
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
            <h1>User</h1>
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
            </form>
        </div>
    </div>
    </>
  )
}
