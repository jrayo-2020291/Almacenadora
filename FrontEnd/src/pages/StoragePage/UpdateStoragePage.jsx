import React from 'react'
import '../../AppStyle.css'
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

export const UpdateStoragePage = () => {
    const [storage, setStorage] = useState({})
    const { id } = useParams();
    const token = localStorage.getItem(`token`)


    const getStorage = async()=>{
        try{
            const { data } = await axios(`http://localhost:2651/storage/getForId/${id}`, {
              headers: {
                  'Authorization': token
              }
          })
            setStorage(data.storage)
        }catch(err){
            console.error(err)
        }
    }
    

    const updateStorage = async()=>{
        try{
            let updatedStorage = {
                name: document.getElementById('inputname').value,
                description: document.getElementById('inputdescription').value,
                location: document.getElementById('inputlocation').value,
                size: document.getElementById('inputsize').value,
                availability: document.getElementById('inputavailability').value,
                monthlyPrice: document.getElementById('inputmonthlyPrice').value,
                
            }
            const { data } = await axios.put(`http://localhost:2651/storage/update/${id}`, updatedStorage , {
              headers: {
                  'Authorization': token
              }
          })
           alert(`${data.message} ${data.updatedStorage.name}`)
           
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=> getStorage, [])

   
  return (
    <>
      <meta charSet="UTF-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="shortcut icon" href="./img/favicon.png" type="image/x-icon"/>
      <link rel="stylesheet" href="./css/stylesheet.css"/>
      <script src="https://kit.fontawesome.com/32c2859f80.js" crossOrigin="anonymous"></script>
      <title>Actualizar Bodega</title>
      <main>
      <div className="container">
          <div className="box">
              <h1>Bodega</h1>
              <form>
                  <div>
                      <i className="fa-solid fa-user"></i>
                      <input defaultValue={storage.name} type="text" placeholder="name" className="form-control" id="inputname" required/>
                  </div>
                  <br/>
                  <div>
                      <i className="fa-solid fa-pencil"></i>
                      <input defaultValue={storage.description} type="text" placeholder="description" className="form-control" id="inputdescription" required/>
                  </div>
                  <br/>
                  <div>
                      <i className="fa-solid fa-location-dot"></i>
                      <input defaultValue={storage.location} type="text" placeholder="location" className="form-control" id="inputlocation" required/>
                  </div>
                  <br/>
                  <div>
                      <i className="fa-solid fa-window-maximize"></i>
                      <input defaultValue={storage.size} type="text" placeholder="size" className="form-control" id="inputsize" required/>

                  </div>
                  <br/>
                  <div>
                      <i className="fa-solid fa-arrow-trend-up"></i>
                      <input defaultValue={storage.availability} type="text" placeholder="availability" className="form-control" id="inputavailability" required/>

                  </div>
                  <br/>
                  <div>
                      <i className="fa-solid fa-tag"></i>
                      <input defaultValue={storage.monthlyPrice} type="text" placeholder="monthlyPrice" className="form-control" id="inputmonthlyPrice" required/>
                  </div>
                  <br/>
                  <button onClick={()=>  updateStorage()} type="submit" className="btn btn-outline-primary">Update</button>
              </form>
          </div>
      </div>
    </main>  
    </>
  )
}
