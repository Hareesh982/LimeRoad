import React, { useEffect, useState } from 'react'
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

let SingleProduct = ({product}) =>{
    return (
        <>
            <div className='row p-2'>
                <div className='col-md-2'>
                    <img src={product.image} alt='...' style={{width:'200px'}}/>
                </div>
                <div className='col-md-2'>
                    <img src={product.image_2} alt='...' style={{width:'200px'}}/>
                </div>
                <div className='col-md-2'>
                    <img src={product.image_3} alt='...' style={{width:'200px'}}/>
                </div>
                <div className='col-md-6'>
                    <small><span className='fw-bold'>Title</span> : {product.title}</small><br/>
                    <small><span className='fw-bold'>Description</span> : {product.description}</small><br/>
                    <small><span className='fw-bold'>Price</span> : Rs.{product.price}</small><br/>
                    <small><span className='fw-bold'>Category</span> : {product.category}</small><br/>
                    <small><span className='fw-bold'>Subcategory</span> : {product.subcategory}</small><br/>
                    <small><span className='fw-bold'>Brand</span> : {product.brand}</small><br/>

                </div>
            </div>
        </>
    )
}

function VendorProducts({user}) {
    let [data,setData] = useState([])
    let VendorData = data.filter((product) => product.vendor_id === user._id)
    
    useEffect(() =>{
        let GetProductDetails = async() =>{
            try{
              let response = await axios.get(`${apiUrl}/clothing-details`)
              setData(response.data.user)
            }
            catch(error){
              console.error('Error fetching data:', error)
            }
          }
          GetProductDetails()
    },[])
        
          
      
    return (
    <>
        {
            data ? (
                <div className='container mt-4 bg-white rounded card shadow'>
                    {
                        VendorData.map((product) => <SingleProduct product={product}/>)
                    }
                </div>
            ):
            (
                <div>
                    No data
                </div>
            )
        }
        
    </>
  )
}

export default VendorProducts