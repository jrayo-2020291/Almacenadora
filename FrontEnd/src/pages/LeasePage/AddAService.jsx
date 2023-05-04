import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { A_Service } from '../../components/Models/A_Services'
import imgLoading from '../../assets/Loading.gif'


export const AddAService = () => {
    const [services, setServices] = useState([{}])
    const [lease, setLease] = useState([{}])
    const token = localStorage.getItem(`token`)
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [addressingUrl, setAddressingUrl] = useState('') 
    const role = localStorage.getItem('role')

    const addressing = ()=>{
        if (role === 'ADMIN'){
            setAddressingUrl('/dashboard/Lease')
        } else {
            setAddressingUrl('/worker')
        }
    } 

    const getServices = async () => {
        try {
            const { data } = await axios('http://localhost:2651/service/get')
            setServices(data.services)
        } catch (err) {
            console.error(err);
        }
    }
    const getLease = async () => {
        try {
            const { data } = await axios.get(`http://localhost:2651/lease/get/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            let array = []
            let service = data.lease.services
            service.forEach(element=>{
                array.push(element.service)
            })
            console.log(array)
            setLease(array)
            setLoading(false)
        } catch (err) {
            console.error(err)
        }
    }
    const updateLease = async (e) => {
        try {
            e.preventDefault()
            let updatedLease = {
                serviceId: document.getElementById('inputService').value
            }
            const { data } = await axios.put(`http://localhost:2651/lease/addService/${id}`, updatedLease,
                {
                    headers: {
                        'Authorization': token
                    }
                })
            alert(`${data.message}`)
            if(role === 'ADMIN'){
                navigate('/dashboard/Lease')
            }else{
                navigate('/worker')
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => getServices, [])
    useEffect(() => getLease, [])
    useEffect(() =>addressing, [])
    if (loading) {
        return (
            <img src={imgLoading} alt="Loading..." />
        )
    }

    return (
        <>
            <div className="container">
                <div className="box">
                    <h1>Arrendamiento</h1>
                    <table>
              <thead>
                <tr>
                  <th>Servicios contratados</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {
                  lease.map(({ _id, name, description, price}, index) => {
                    return (
                      <tr key={index}>
                        <A_Service
                          name={name}
                          description={description}
                          price={price}
                        ></A_Service>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
                    <form>
                        <div>
                            <i className="fa-solid fa-user-shield icon side">Servicio</i>
                            <select className="form-control" id="inputService" required>
                                {
                                    services.map(({ _id, name }, i) => {
                                        return (
                                            <option key={i} value={_id}>{name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <br />
                        <button onClick={(e) => updateLease(e)} type="submit" className="btn btn-primary">Add</button>
                        <Link to={addressingUrl}>
                            <button type="submit" className="btn btn-primary">Cancel</button>
                        </Link>

                    </form>
                </div>
            </div>
        </>
    )
}
