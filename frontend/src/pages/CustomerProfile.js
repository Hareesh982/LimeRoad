import React, { useEffect,useState } from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL;
const CustomerProfile = () => {
  let [user,setUser] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}/customer-details`, {
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