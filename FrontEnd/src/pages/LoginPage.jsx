import React,  { useContext, useState } from 'react'
import '../AppStyle.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Index'
import axios from 'axios'
import { Navigate } from 'react-router-dom' 

export const LoginPage = () => {
    const navigate = useNavigate()
  const {setLoggedIn, loggedIn, setDataUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const login = async(e)=>{
    try{
      // e.preventDefault()  
      const { data } = await axios.post('http://localhost:2651/account/login', form)

      if(data.token){
        setLoggedIn(true)
        localStorage.setItem('token', data.token)
        setDataUser({
          name: data.userLogged.name,
          username: data.userLogged.username,
          role: data.userLogged.role
        })
        return <Navigate to='/dashboard'></Navigate>
      }
    }catch(err){
      console.log(err)
      alert(err.response.data.message)
      throw new Error('Error login failed')
    }
  }
  return (
    <>
    <meta charSet="UTF-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="./img/favicon.png" type="image/x-icon"/>
    <script src="https://kit.fontawesome.com/32c2859f80.js" crossOrigin="anonymous"></script>
    <title>Login</title>
    <div className="container">
        <div className="box">
            <h1>Login</h1>
            <form>
                <div>
                    <i className="fa-solid fa-user"></i>
                    <input onChange={handleChange} type="text" placeholder="Usuario"/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-lock"></i>
                    <input onChange={handleChange} type="password" placeholder="Contraseña"/>
                </div>
                <br/>
                <Link to='/dashboard'>
                <button onClick={(e)=>login(e)} className="login">Entrar</button>
                </Link>
            </form>
            <div className="footer"><span>Registrate</span><span>¿Olvidaste tu contraseña?</span></div>
        </div>
    </div>
</>
  )
}
