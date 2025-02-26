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
          <div className='col-6'>

            <div id="carouselExampleIndicators" class="carousel" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner" >
                  <div class="carousel-item active" >
                    <img src={product.image} class="d-block w-100" alt="..."/>
                  </div>
                  <div class="carousel-item">
                    <img src={product.image_2} class="d-block w-100" alt="..."/>
                  </div>
                  <div class="carousel-item">
                    <img src={product.image_3} class="d-block w-100" alt="..."/>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
          
          </div>


          <div className='col-6' style={{height:'50%',backgroundColor:'white',padding:'20px',borderRadius:'0px'}} >
            <div className='d-flex flex-column'>
              <span style={{fontSize:'30px'}}>{product.title}</span>
              <span>{product.description}</span>
              <div className='d-flex align-items-center gap-2 mt-4'>
                <span>{product.rating.rate}</span>
                {Array.from({ length: Math.floor(product.rating.rate) }).map((_, i) => (
                  <i key={i} className="bi bi-star-fill" style={{ color: 'yellowgreen' }}></i>
                ))}
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
              <span className='mt-3'><span style={{color:'red'}}>30%</span> Discount</span>
              <hr/>
              <span className='mt-3'>After Discount</span>
              <span className='mt-3'>Price : Rs.{product.price}</span>
              
              <div>
                <span style={{fontSize:'12px'}}>M.R.P. inclusive of all taxes</span>
              </div>
              
              <button onClick={handleCart} className='mt-3' style={{ width: '100%',backgroundColor:'yellowgreen',border:'none',padding:'10px',color:'white',fontWeight:'bold',borderRadius:'5px' }}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className='container mt-5'>
        <Clothingfetch category={product.category} subcategory={product.subcategory} />
      </div>
      <Footer/>
    </>
  );
}

export default ProductDetails;
