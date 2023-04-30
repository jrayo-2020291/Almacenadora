import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

export const UpdateAccountPage = () =>{
    const [account, setAccount] = useState({})
    const { id } = useParams();
    const token = localStorage.getItem(`token`)


    const getAccount = async()=>{
        try{
            const { data } = await axios(`http://localhost:2651/account/getForId/${id}`, {
              headers: {
                  'Authorization': token
              }
          })
            setAccount(data.product)
        }catch(err){
            console.error(err)
        }
    }
    

    const updateAccount = async()=>{
        try{
            let updatedAccount = {
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                username: document.getElementById('inputUsername').value,
                email: document.getElementById('inputEmail').value,
                phone: document.getElementById('inputPhone').value
                
            }
            const { data } = await axios.put(`http://localhost:2651/account/update/${id}`, updatedAccount , {
              headers: {
                  'Authorization': token
              }
          })
           alert(`${data.message} ${data.updatedProduct.name}`)
           
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=> getAccount, [])

   
  return (
    <> 
    <meta charSet="UTF-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="./img/favicon.png" type="image/x-icon"/>
    <link rel="stylesheet" href="./css/stylesheet.css"/>
    <script src="https://kit.fontawesome.com/32c2859f80.js" crossOrigin="anonymous"></script>
    <div className="container">
        <div className="box">
            <h1>Empleado</h1>
            <form>
                <div>
                    <i className="fa-solid fa-user"></i>
                    <input defaultValue={account.name} type="text" placeholder="name" className="form-control" id="inputName" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-user-clock"></i>
                    <input defaultValue={account.surname} type="text" placeholder="surname" className="form-control" id="inputSurname" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-users"></i>
                    <input defaultValue={account.username} type="text" placeholder="username" className="form-control" id="inputUsername" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-lock"></i>
                    <input defaultValue={account.email} type="text" placeholder="email" className="form-control" id="inputEmail" required/>
                </div>
                <br/>
                <div>
                    <i className="fa-solid fa-envelope"></i>
                    <input defaultValue={account.phone} type="text" placeholder="phone" className="form-control" id="inputPhone" required/>
                </div>
                <br/>
                <button onClick={()=>  updateAccount()} type="submit" className="btn btn-outline-primary">Update</button>

            </form>
        </div>
    </div>
    </>
  )
}
