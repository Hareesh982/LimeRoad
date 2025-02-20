import React from 'react'
import Navbar from '../component/Navbar'
import './login.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2'

let AuthRegister = () => {
    const navigate = useNavigate()
    const [MobileError, setMobileError] = useState("");
    const [PasswordError, setPasswordError] = useState("");
    const [EmailError, setEmailError] = useState("")
    const [MobileExistError, setMobileEixstError] = useState("")
    const [formData,setFormData] = useState(
        {
            name:'',
            email : '',
            mobile : '',
            password : '',
            re_password : '',
            user_type : ''
        }
    )

    let handleChange = (event) => {
        setFormData({...formData, [event.target.name] : event.target.value})
    }

    const handleMobile = (event) => {
        const value = event.target.value;
        if (!/^\d+$/.test(value)) {
            setMobileError("Only numbers are allowed");
        } else if (value.length !== 10) {
            setMobileError("Enter a 10-digit mobile number");
        } else {
            setMobileError("");
        }
    };

    
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

        if (MobileError ||  formData.password !== formData.re_password) {
            setPasswordError("Passwords do not match");
            return;
        }


        try{
            await axios.post('http://127.0.0.1:3005/register',formData)
            swal.fire({
                title: "Registration Successful",
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
            let message = err.response?.data?.message
            if(message === "Email already exists"){
                setEmailError(message)
            }
            else if(message === "Mobile number already in use"){
                setMobileEixstError(message)
            }
        }
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit} className='col-md-4 mx-auto mt-2'>
                    <div style={{ backgroundColor: 'white', padding: '20px' }}>
                        <span className='fs-4'>
                            <i className="bi bi-person-fill fs-4"></i>SIGN UP
                        </span>
                    </div>
                    <div className='d-flex justify-content-around'>
                        <div>
                            <input type='radio' name='userType' id='customer' value='customer' required /> 
                            <label htmlFor='customer'>Customer</label>
                        </div>

                        <div>
                            <input type='radio' id='vendor' name='userType' value='vendor' /> 
                            <label htmlFor='vendor'>Vendor</label>
                        </div>

                        <div>
                            <input type='radio' id='admin' name='userType' value='admin' />
                            <label htmlFor='admin'>Admin</label>
                        </div>
                    </div>

                    <div className='d-flex flex-column f-5 p-2'>
                        <input 
                            type='text'
                            placeholder='Fullname'
                            required
                            className='p-2 inputclass'
                            name = 'name'
                            value={formData.name}
                            style={{ backgroundColor: 'transparent' }}
                            onChange={handleChange}
                        />
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
                            type='tel'
                            placeholder='Mobile'
                            required
                            className='p-2 inputclass'
                            name='mobile' 
                            value={formData.mobile}
                            style={{ backgroundColor: 'transparent' }}
                            onChange={(event) => {
                                handleChange(event); 
                                handleMobile(event);
                            }}
                        />
                        {MobileError && <small style={{ color: 'red', marginTop: '5px', fontSize:'10px' }}>{MobileError}</small>}
                        {MobileExistError && <small style={{ color: 'red', marginTop: '5px', fontSize:'10px' }}>{MobileExistError}</small>}
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
                            type='submit'
                            className='mt-5' 
                            style={{ border: 'none', backgroundColor: 'yellowgreen', width: '100%', padding: '10px', borderRadius: '5px' }}
                        >
                            SUBMIT
                        </button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <p>Already have an account <Link to='/login'>Login here</Link></p>
                    </div>
                </form>
            </div>
        </>
    );
};

function RegisterPage() {  
  return (
    <>
        <Navbar/>
        <AuthRegister/>
    </>
  )
}

export default RegisterPage
