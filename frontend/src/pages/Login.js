import React from 'react'
import Navbar from '../component/Navbar'
import './login.css'

let Authlogin = () => {
    const [mobile, setMobile] = React.useState("");
    const [error, setError] = React.useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setMobile(value);
        
        if (value.length < 10) {
            setError("Enter 10 digit mobile number");
        } else {
            setError("");
        }
    };

    return (
        <>
            <div className='container'>
                <form className='col-md-4 mx-auto mt-5'>
                    <div style={{ backgroundColor: 'white', padding: '20px' }}>
                        <span className='fs-4'>
                            <i className="bi bi-person-fill fs-4 px-3"></i>SIGN IN
                        </span>
                        <hr />
                        <p className='px-3'>sign in to proceed further</p>
                    </div>

                    <div className='d-flex flex-column f-5 mt-4 p-2'>
                        <label style={{ fontSize: '14px' }}>Mobile Number</label>
                        <input 
                            className='p-2 inputclass' 
                            style={{ 
                                backgroundColor: 'transparent', 
                            }}
                            value={mobile} 
                            onChange={handleChange} 
                        />
                        {error && <small style={{ color: 'red', marginTop: '5px',fontSize:'10px' }}>{error}</small>}
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