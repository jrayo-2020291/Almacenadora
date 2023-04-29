import React, { useEffect } from 'react'
import '../Homepage.js'
import '../Homepage.css'
import img1 from '../assets/storage.png'
import img2 from '../assets/worker.png'

export const HomePage = () => {
  return (
    <>
    <meta charSet="UTF-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="../assets/favicon.png" type="image/x-icon"/>
    <script src="https://kit.fontawesome.com/32c2859f80.js" crossOrigin="anonymous"></script>
    <main>
        <div className="big-wrapper light">
          <header>
            <div className="container">
              <div className="logo">
                <img src={img1} alt="Logo" />
                <h3>Almacenadora Robbins</h3>
              </div>
  
              <div className="links">
                <ul>
                  <li><a href="#">Nosotros</a></li>
                  <li><a href="#">Proveedores</a></li>
                  <li><a href="#">Ubicación</a></li>
                  <li><a href="./login.html" className="btn">Inicia Sesión</a></li>
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
                  <a href="#" className="btn">Saber mas</a>
                </div>
              </div>
              <div className="right">
                <img src={img2} className="person"/>
              </div>
            </div>
        </div>
      </div>
    </main>
    <script></script>
</>
  )
}