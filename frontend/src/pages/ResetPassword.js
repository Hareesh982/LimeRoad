import React, { useState,useEffect } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_URL;

function ResetPassword() {
    let navigate = useNavigate()
    const [EmailError, setEmailError] = useState("")
    const [PasswordError, setPasswordError] = useState("");

    let [formData, setFormData] = useState(
        {
            email :'', 
            password : '',
            re_password : ''
        }
    )

    let handleChange = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value})
    }


    useEffect(() => {
        if (formData.password && formData.re_password) {
            if (formData.password !== formData.re_password) {
                setPasswordError("Passwords do not match");
            } else {
                setPasswordError("");
            }
        }
    }, [formData.password, formData.re_password]);

    let handleSubmit = async(event) =>{
        event.preventDefault()

        if (formData.password !== formData.re_password) {
            setPasswordError("Passwords do not match");
            return;
        }
        try{
            let response = await axios.post(`${apiUrl}/reset-password`,formData)
            let message = response.data.message
            Swal.fire({
                title: message,
                icon: "success",
                confirmButtonText: "Click to continue",
                allowOutsideClick: false 
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login'); 
                }
              });
        }
        catch(err){
            if(err.response?.data?.message_subject === 'email'){
                setEmailError(err.response?.data?.message)
            }
            else if(err.response?.data?.message_subject === 'password'){
                setPasswordError(err.response?.data?.message)
            }
            else{
                alert(err.response?.data?.message)
            }
            
        }
    }

    return (
    <>  
        <Navbar/>
        <div className='container'>
                <form onSubmit={handleSubmit} className='col-md-4 mx-auto mt-5'>
                    <div className='text-center' style={{ backgroundColor: 'white', padding: '20px' }}>
                        <span className='fs-4'>
                            Reset Account with New password
                        </span>
                    </div>

                    <div className='d-flex flex-column f-5 p-2'>
                        <input 
                            type='email'
                            placeholder='Email'
                            required
                            className='p-2 inputclass'
                            name = 'email' 
                            value={formData.email}
                            style={{ backgroundColor: 'transparent' }}
                            onChange={handleChange}
                        />
                        {EmailError && <small style={{ color: 'red', marginTop: '5px', fontSize:'10px' }}>{EmailError}</small>}
                    </div>
                    <div className='d-flex flex-column f-5 p-2'>
                        <input 
                            type='password'
                            placeholder='Password'
                            required
                            name='password'
                            className='p-2 inputclass' 
                            style={{ backgroundColor: 'transparent' }} 
                            onChange={(event) => {
                                handleChange(event);
                            }}
                        />
                        {PasswordError && <small style={{ color: 'red', marginTop: '5px', fontSize:'10px' }}>{PasswordError}</small>}
                    </div>
                    <div className='d-flex flex-column f-5 p-2'>
                        <input 
                            type='password'
                            placeholder='Re-enter password'
                            required
                            name='re_password'
                            className='p-2 inputclass' 
                            style={{ backgroundColor: 'transparent' }} 
                            onChange={(event) => {
                                handleChange(event);
                            }}
                        />
                        {PasswordError && <small style={{ color: 'red', marginTop: '5px', fontSize:'10px' }}>{PasswordError}</small>}
                    </div>
                    <div>
                        <button 
                            className='mt-5' 
                            style={{ border: 'none', backgroundColor: 'yellowgreen', width: '100%', padding: '10px', borderRadius: '5px' }}
                        >
                            NEXT
                        </button>
                    </div>
                </form>
            </div>
    </>
  )
}

export default ResetPassword