import React from 'react'
import '../../AppStyle.css'

export const AddStoragePage = () => {
    const title = 'ADD STORAGE'

    const token = localStorage.getItem(`token`)


    const addStorage = async()=>{
        try{
            let storage = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                location: document.getElementById('location').value,
                size: document.getElementById('size').value,
                availability: document.getElementById('availability').value,
                monthlyPrice: document.getElementById('monthlyPrice').value,
                
            }
            const { data } = await axios.post('http://localhost:2651/storage/add', storage,
            )
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
                    <input type="text" placeholder="Nombre" id='name'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-pencil"></i>
                    <input type="text" placeholder="Descripción" id='description'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-location-dot"></i>
                    <input type="text" placeholder="Ubicación" id='location'/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-window-maximize"></i>
                    <input type="text" placeholder="Tamaño" id='size'/>

                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-arrow-trend-up"></i>
                    <input type="text" placeholder="Disponibilidad" id='availability'/>

                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-tag"></i>
                    <input type="number" placeholder="Precio" id='monthlyPrice'/>
                </div>
                <br/>
                <button onClick={()=>  addStorage()} type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    </div>
        </main>  
    </>
  )
}
