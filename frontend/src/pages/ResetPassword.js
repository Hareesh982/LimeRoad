import React from 'react'
import Navbar from '../component/Navbar'

function ResetPassword() {
  return (
    <>  
        <Navbar/>
        <div className='container'>
                <form className='col-md-4 mx-auto mt-5'>
                    <div className='text-center' style={{ backgroundColor: 'white', padding: '20px' }}>
                        <span className='fs-4'>
                            FORGOT PASSWORD?
                        </span>
                    </div>

                    <div className='d-flex flex-column f-5 mt-4 p-2'>
                        <label style={{ fontSize: '12px' }}>Enter registered email</label>
                        <input 
                            type='email'
                            required
                            className='p-2 inputclass' 
                            style={{ 
                                backgroundColor: 'transparent', 
                            }} 
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
                </form>
            </div>
    </>
  )
}

export default ResetPassword