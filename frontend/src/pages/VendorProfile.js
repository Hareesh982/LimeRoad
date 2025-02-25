import React from 'react'
import Navbar from '../component/Navbar';
import axios from 'axios'
import { useState,useEffect } from 'react';

import VendorProductForm from '../component/VendorProductForm';
import VendorProducts from '../component/VendorProducts';

function VendorProfile() {
  
  let [FormSection,setFormSection] = useState(false)
  let [user,setUser] = useState(null)
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3005/vendor-details', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user details:', error.response ? error.response.data : error.message);
            }
        };

        fetchUserDetails();
    }
  }, []);
  
    return (
      
      <>
      {
        user ? (
          <>
            <Navbar/>

              
                <div className='container my-4'>
                  <div className='d-flex justify-content-start gap-2 px-3'>
                    <button style={{width:'auto'}} onClick={() => setFormSection(true)} className='btn btn-primary'>Add Product</button>
                    <button style={{width:'auto'}} onClick={() => setFormSection(false)} className='btn btn-danger'>close</button>
                  </div>
                </div>
                {
                  FormSection ? (

                        <>
                          <VendorProductForm user={user}/>
                          
                        </>
                   
                  ):
                  (
                    <div></div>
                  )
                }
              <div className='container mt-5 px-3'>
                <span className='bg-info w-auto p-2 rounded text-white'>Your Products <span className='fs-1'>↴</span></span>
              </div>
              
                <VendorProducts user={user}/>
              
              
          </>
        ):
        (
          <p>no response</p>
        )
      }
        
      </>
    )
}

export default VendorProfile
