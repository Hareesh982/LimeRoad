import React, { useEffect,useState } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios'

const CustomerProfile = () => {
  let [user,setUser] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3005/customer-details', {
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
          <div>
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>Mobile : {user.mobile}</p>
            <p>user type : {user.userType}</p>
          </div>
        </>
      ):
      (
        <p>no response</p>
      )
    }
    </>
  )
}

export default CustomerProfile