import React from 'react'
import Navbar from '../component/Navbar'
import './login.css'
import { useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
const apiUrl = process.env.REACT_APP_API_URL;

let Authlogin = () => {
    const navigate = useNavigate()

    const [error, setError] = useState("");

    const [formData,setFormData] = useState(
            {
                email : '',
                password : '',
            }
        )
    
    let handleChange = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value})
    }

    let handleSubmit = async(event) =>{
        event.preventDefault()

        try{
            let response = await axios.post(`${apiUrl}/login`, formData, { withCredentials: true })
            if (response.status === 200) {
                const token = response.data.token;
                const message = response.data.message
                localStorage.setItem('token', token); 
    
                Swal.fire({
                    title: message,
                    icon: "success",
                    confirmButtonText: "Click to continue",
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                        window.location.reload()
                    }
                });
            };
        }
        catch(err){
            setError(err.response?.data?.message)
        }
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit} className='col-md-4 mx-auto mt-5'>
                    <div style={{ backgroundColor: 'white', padding: '20px' }}>
                        <span className='fs-4'>
                            <i className="bi bi-person-fill fs-4 px-3"></i>SIGN IN
                        </span>
                        <hr />
                        <p className='px-3'>sign in to proceed further</p>
                    </div>

                    <div className='d-flex flex-column f-5 mt-4 p-2'>
                        <label style={{ fontSize: '12px' }}>Email</label>
                        <input 
                            type='Email'
                            className='p-2 inputclass' 
                            style={{ 
                                backgroundColor: 'transparent', 
                            }}
                            name='email'
                            value={formData.email}
                            required
                            onChange={handleChange}
                        />
                        
                    </div>
                    <div className='d-flex flex-column f-5 p-2'>
                        <label style={{ fontSize: '12px' }}>Password</label>
                        <input 
                            type='password'
                            className='p-2 inputclass' 
                            style={{ 
                                backgroundColor: 'transparent', 
                            }}
                            name='password'
                            value={formData.password}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    
                            
                    <div>
                        <button 
                            className='mt-5' 
                            style={{ border: 'none', backgroundColor: 'yellowgreen', width: '100%', padding: '10px', borderRadius: '5px' }}
                        >
                            NEXT
                        </button>
                    </div>
                    {error && <p style={{ color: 'red', marginTop: '5px',fontSize:'14px' }}>{error}</p>}
                </form>
                <ForgotPassword/>
            </div>
        </>
    );
};



function LoginPage() {  
  return (
    <>
        <Navbar/>
        <Authlogin/>
    </>
    
  )
}

export default LoginPage