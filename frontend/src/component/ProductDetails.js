import React from 'react';
import './ProductDetails.css';
import { Clothingfetch } from '../pages/Mainclothing';
import Footer from './Footer';
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import Stack from '@mui/material/Stack';

function ProductDetails({ product }) {
  let mrpPrice = product.price + product.price * 0.3;
  
  
  let dispatch = useDispatch()
  let [showAlert, setShowAlert] = useState(false);
  let [selectedSize, setSelectedSize] = useState(product.size[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);


  let handleCart = () => {
    dispatch(addToCart({ ...product, selectedSize })); 
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  }
  return (

    <>
      {showAlert && (
        <Stack sx={{ width: 'auto', position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }} spacing={2}>
          <Alert variant="filled" severity="success">
            Product added to cart successfully!
          </Alert>
        </Stack>
      )}
      
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <div id="carouselExampleIndicators" className="carousel w-80" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner h-50" >
                  <div className="carousel-item active" >
                    <img src={product.image} className="w-100 h-70" alt="..."/>
                  </div>
                  <div className="carousel-item">
                    <img src={product.image_2} className="w-100 h-70" alt="..."/>
                  </div>
                  <div className="carousel-item">
                    <img src={product.image_3} className="w-100 h-70" alt="..."/>
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              
          </div>


          <div className='col-md-6'>
            <div className='d-flex flex-column bg-white p-3'>
              <span style={{fontSize:'20px'}}>{product.title}</span>
              <span style={{fontSize:'12px'}}>{product.brand}</span>
              <div className='d-flex align-items-center gap-2 mt-2'>
                <span>{product.rating.rate}</span>
                {Array.from({ length: Math.floor(product.rating.rate) }).map((_, i) => (
                  <i key={i} className="bi bi-star-fill" style={{ color: 'yellowgreen' }}></i>
                ))}
              </div>
              <div className='d-flex gap-3 mt-2'>
                <span className='text-success'><i className='bi bi-whatsapp fs-4'></i></span>
                <span><i className='bi bi-share-fill fs-4'></i></span>
              </div>
              <div className='mt-3' style={{ width: '100px' }}>
                <label htmlFor='size'>Select size:</label>
                <select id='size' className='form-select' onChange={(e) => setSelectedSize(e.target.value)}>
                  {
                    product.size.map(size => <option value={size}>{size}</option>)
                  }
                </select>
              </div>
              
              <span className='mt-3'>M.R.P : Rs.{mrpPrice.toFixed(2)}</span>
              <span>30% Discount</span>
              <hr/>
              {
                product.available_quantity < 1 ?(
                  <span>No items left</span>
                ):
                (
                  <span className='text-danger'>Hurry up Only {product.available_quantity} items left</span>
                )
              }
              
              <span className='mt-3'>After Discount</span>
              <span className='mt-3'>Price : Rs.{product.price}</span>
              
              <div>
                <span style={{fontSize:'12px'}}>M.R.P. inclusive of all taxes</span>
              </div>
              {
                product.available_quantity < 1 ? (
                  <div className='mt-4'><span className='bg-danger rounded p-1 text-white'>Out of Stock</span></div>
                ):
                (
                  <button onClick={handleCart} className='mt-3' style={{ width: '100%',backgroundColor:'yellowgreen',border:'none',padding:'10px',color:'white',fontWeight:'bold',borderRadius:'5px' }}>Add to Cart</button>
                )
              }
              <span className='mt-4'>Description : <span style={{fontSize:'14px'}}>{product.description}</span> </span>
              <span className='mt-4' style={{fontSize:'14px',color:'grey'}}>Delivery & Return</span>
              <span style={{fontSize:'14px'}}>Expected delivery in 3 to 6 days</span>
              <div className='d-flex flex-column mt-2'> 
                <span style={{fontSize:'14px',color:'grey'}}>metros :</span>
                <span style={{fontSize:'14px'}}>3-5 working days</span>
              </div>
              <div className='d-flex flex-column mt-2'> 
                <span style={{fontSize:'14px',color:'grey'}}>other cities :</span>
                <span style={{fontSize:'14px'}}>5-7 working days</span>
              </div>
              <div className='d-flex flex-column mt-2'> 
                <span style={{fontSize:'14px',color:'grey'}}>areas serviceable only by speed post :</span>
                <span style={{fontSize:'14px'}}>15 working days</span>
              </div>
              <span className='mt-2'>7 days, no hassle returns!</span>
              
            </div>
          </div>
        </div>
      </div>
      
      
      <Clothingfetch category={product.category} subcategory={product.subcategory} />
      <Footer/>
    </>
  );
}

export default ProductDetails;
