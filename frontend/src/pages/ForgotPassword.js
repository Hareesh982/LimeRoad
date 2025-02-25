import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function ForgotPassword() {
    let navigate = useNavigate()
    let [email,setEmail] = useState("")
    let [errorMessage,setErrorMessage] = useState("")

    let handleEmailChange = (event) =>{
        setEmail(event.target.value)
    }

    let handleEmailSubmit = async(event) =>{
        event.preventDefault()
        try{
            let response = await axios.post('http://localhost:3005/forgot-password',{email})
            let message = response.data.message + email
            Swal.fire({
                title : 'Email Found',
                text : message,
                allowOutsideClick : false,
                icon : 'success',
                confirmButtonText : 'Continue'
            }).then((result) => {
                if(result.isConfirmed){
                    navigate('/login')
                    window.location.reload()
                }
            })
        }
        catch(error){
            setErrorMessage(error.response?.data?.message)
        }
    }

    

    return (
    <>
        <div className='d-flex justify-content-center gap-4'>
            <button  data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{border:'none',padding:'0',margin:'0'}}>
                Forgot password?
            </button>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <form onSubmit={handleEmailSubmit} class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Enter Registered Email</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input 
                        type='email'
                        placeholder='Email' 
                        required 
                        style={{all:'unset',width:'96%',border:'3px solid yellowgreen',padding:'5px',borderRadius:'5px'}}
                        onChange={(event) => handleEmailChange(event)}
                        />
                        {errorMessage && <small style={{ color: 'red', marginTop: '5px', fontSize:'10px' }}>{errorMessage}</small>}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">submit</button>
                    </div>
                    </div>
                </form>
            </div>
            <Link to='/register'>Register here</Link>
        </div>
    </>
  )
}

export default ForgotPassword