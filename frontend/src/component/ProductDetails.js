import React from 'react';
import './ProductDetails.css';
import {Clothingfetch} from '../pages/Womenclothing';
import { MenClothingfetch } from '../pages/Menclothing';

function ProductDetails({ product }) {
 
  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-6' style={{height:'50%'}}>
            <img src={product.image} alt={product.name} width='100%' height='100%'  style={{ objectFit: 'cover'}} />
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
                <select id='size' className='form-select'>
                  <option value='S'>S</option>
                  <option value='M'>M</option>
                  <option value='L'>L</option>
                  <option value='XL'>XL</option>
                </select>
              </div>
              
              <span className='mt-3'>M.R.P : ${product.price + product.price * 0.3}</span>
              <span className='mt-3'><span style={{color:'red'}}>30%</span> Discount</span>
              <hr/>
              <span className='mt-3'>After Discount</span>
              <span className='mt-3'>Price : ${product.price}</span>
              
              <div>
                <span style={{fontSize:'12px'}}>M.R.P. inclusive of all taxes</span>
              </div>
              
              <button className='mt-3' style={{ width: '100%',backgroundColor:'yellowgreen',border:'none',padding:'10px',color:'white',fontWeight:'bold',borderRadius:'5px' }}>Add to Cart</button>
              <button className='mt-3' style={{ width: '100%',backgroundColor:'yellowgreen',border:'none',padding:'10px',color:'white',fontWeight:'bold',borderRadius:'5px' }}>Buy now</button>
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        {product.category === "women" && <Clothingfetch />}
        {product.category === "men" && <MenClothingfetch />}
      </div>
      
    </>
  );
}

export default ProductDetails;
