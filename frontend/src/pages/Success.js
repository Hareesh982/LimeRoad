import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL;
function Success() {
    let navigate = useNavigate()
    useEffect(() =>{
        const CartUpdateAfterPayment = async() =>{
            let token = localStorage.getItem('token')
            if(token){
                try{
                    let response = await axios.get(`${apiUrl}/api/update-cart`,{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if(response?.data?.message){
                        alert(response.data.message)
                    }
                }
                catch(error){
                    alert(error.response?.data?.message)
                }
            }
        }
        CartUpdateAfterPayment()
    },[])
    return (
    <>
        <div className='container mt-4'>
            <div className='row justify-content-center'>
                <div className='col-md-6 card shadow d-flex p-5'>
                    <div className='row justify-content-center'>
                        <div className='col-md-2'>
                            <span>
                                <i className='bi bi-check fs-1 rounded-circle px-2 py-1' style={{color:'white', backgroundColor:'green'}}></i>
                            </span>
                        </div>
                        <div className='col-md-8'>
                        <p className='fs-1'>Payment successfull</p>
                        </div>
                    </div>
                    <div className='row justify-content-center mt-4'>
                        <div className='col-md-4'>
                            <button className='btn btn-success' onClick={() => {
                                navigate('/');
                                window.location.reload()
                                }}>Continue shopping</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Success