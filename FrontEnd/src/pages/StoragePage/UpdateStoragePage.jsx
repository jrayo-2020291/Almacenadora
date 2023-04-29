import React from 'react'
import '../../AppStyle.css'

export const UpdateStoragePage = () => {
  return (
    <>
      <meta charset="UTF-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="shortcut icon" href="./img/favicon.png" type="image/x-icon"/>
      <link rel="stylesheet" href="./css/stylesheet.css"/>
      <script src="https://kit.fontawesome.com/32c2859f80.js" crossorigin="anonymous"></script>
      <title>Actualizar Bodega</title>
      <main>
      <div class="container">
          <div class="box">
              <h1>Bodega</h1>
              <form>
                  <div>
                      <i class="fa-solid fa-user"></i>
                      <input type="text" placeholder="Nombre"/>
                  </div>
                  <br/>
                  <div>
                      <i class="fa-solid fa-pencil"></i>
                      <input type="text" placeholder="Descripción"/>
                  </div>
                  <br/>
                  <div>
                      <i class="fa-solid fa-location-dot"></i>
                      <input type="text" placeholder="Ubicación"/>
                  </div>
                  <br/>
                  <div>
                      <i class="fa-solid fa-window-maximize"></i>
                      <select class="size">
                          <option value="0" disabled selected>Tamaño</option>
                          <option value="1">Grande</option>
                          <option value="2">Mediano</option>
                          <option value="3">Pequeño</option>
                      </select>
                  </div>
                  <br/>
                  <div>
                      <i class="fa-solid fa-arrow-trend-up"></i>
                      <select>
                          <option value="0" disabled selected>Disponibilidad</option>
                          <option value="1">Disponible</option>
                          <option value="2">No Disponible</option>
                      </select>
                  </div>
                  <br/>
                  <div>
                      <i class="fa-solid fa-tag"></i>
                      <input type="number" placeholder="Precio"/>
                  </div>
                  <br/>
                  <input type="submit" value="Actualizar"/>
              </form>
          </div>
      </div>
    </main>  
    </>
  )
}
