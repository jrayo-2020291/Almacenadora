import React from 'react'
import '../Homepage.js'
import '../Homepage.css'
import img1 from '../assets/storage.png'
import img2 from '../assets/worker.png'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <>
        <div className="big-wrapper light">
          <header>
            <div className="container">
              <div className="logo">
                <img src={img1} alt="Logo" />
                <h3>Almacenadora Robbins</h3>
              </div>
  
              <div className="links">
                <ul>
                  <li><a >Nosotros</a></li>
                  <li><a >Proveedores</a></li>
                  <li><a >Ubicación</a></li>
                  <Link to='/login'>
                  <li className="btn">Inicia Sesión</li>
                  </Link>
                </ul>
              </div>
  
              <div className="overlay"></div>
  
              <div className="hamburger-menu">
                  <div className="bar"></div>
              </div>
            </div>
          </header>
          <div className="showcase-area">
            <div className="container">
              <div className="left">
                <div className="big-title">
                  <h1>Almacenamiento seguro,</h1>
                  <h1>Operando desde 1993</h1>
                </div>
                <p className="text">
                    Con más de 30 años de experiencia en Almacenaje de Mercancías y Comercio Exterior, en Argo Almacenadora Robbins S.A. de C.V.
                </p>
                <div className="cta">
                  <a  className="btn">Saber mas</a>
                </div>
              </div>
              <div className="right">
                <img src={img2} className="person"/>
              </div>
            </div>
        </div>
      </div>
</>
  )
}