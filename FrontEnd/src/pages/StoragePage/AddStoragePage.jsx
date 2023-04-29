import React from 'react'
import '../../AppStyle.css'

export const AddStoragePage = () => {
  return (
    <>
        <meta charSet="UTF-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="shortcut icon" href="../assets/favicon.png" type="image/x-icon"/>
        <link rel="stylesheet" href="./css/stylesheet.css"/>
        <script src="https://kit.fontawesome.com/32c2859f80.js" crossOrigin="anonymous"></script>
        <title>Agregar Bodega</title>
        <main>
          <div className="container">
              <div className="box">
                  <h1>Bodega</h1>
                  <form>
                      <div>
                          <i className="fa-solid fa-user"></i>
                          <input type="text" placeholder="Nombre"/>
                      </div>
                      <br/>
                      <div>
                          <i className="fa-solid fa-pencil"></i>
                          <input type="text" placeholder="Descripción"/>
                      </div>
                      <br/>
                      <div>
                          <i className="fa-solid fa-location-dot"></i>
                          <input type="text" placeholder="Ubicación"/>
                      </div>
                      <br/>
                      <div>
                          <i className="fa-solid fa-window-maximize"></i>
                          <select className="size">
                              <option value="0" disabled selected>Tamaño</option>
                              <option value="1">Grande</option>
                              <option value="2">Mediano</option>
                              <option value="3">Pequeño</option>
                          </select>
                      </div>
                      <br/>
                      <div>
                          <i className="fa-solid fa-arrow-trend-up"></i>
                          <select>
                              <option value="0" disabled selected>Disponibilidad</option>
                              <option value="1">Disponible</option>
                              <option value="2">No Disponible</option>
                          </select>
                      </div>
                      <br/>
                      <div>
                          <i className="fa-solid fa-tag"></i>
                          <input type="number" placeholder="Precio"/>
                      </div>
                      <br/>
                      <input type="submit" value="Agregar"/>
                  </form>
              </div>
          </div>
        </main>  
    </>
  )
}
