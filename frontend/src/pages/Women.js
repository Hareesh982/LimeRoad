import React from 'react'
import Navbar from '../component/Navbar'
import Allfeed from '../component/Allfeed'
import Womenfeed from '../component/Womenfeed'
import Carouselfeed from '../carousel/Carouselfeed'

import { useState,useEffect } from 'react'
import axios from 'axios'


function Clothing({product}){
  return (
      <>
          <div 
              className="d-flex flex-column  justify-content-start" 
              style={{

              height: '500px',
              width: 'calc(25% - 20px)',
              margin: '10px', 
              }}
          >
              <img src={product.image} width='100%' height='80%' alt='...'/>

              <div className='mt-2 d-flex align-items-center gap-2'>
                <span style={{border:'1px solid limegreen',color:'limegreen',borderRadius:'5px', fontSize:'12px',padding:'3px 5px'}}>OFFER</span>
                <span style={{fontSize:'13px',color:'limegreen'}}>Deals</span>
              </div><hr/>
              <div className='d-flex align-items-center justify-content-around'>
                <span>${product.price}</span>
                <span className='d-flex gap-2'>
                  {product.rating.rate}
                  <i class="bi bi-star-fill" style={{color:'yellowgreen'}}></i>
                </span>

                <span className='d-flex gap-2 align-items-center'>
                  <i class="bi bi-heart" style={{color:'red'}}></i>
                  <i class="bi bi-whatsapp" style={{color:'green'}}></i>
                </span>
              </div>
          </div>
      </>
  )
}

function Womenclothing(){
  let [data,setData] = useState([])
  useEffect(() =>{
      axios.get('/product.json')
          .then(response => setData(response.data))
  },[])
  let new_data = data.filter(product => product.category === "women")

  return (
      <>
          <div className='container'>
              <div className='row'>
                  {
                      new_data.map(product => <Clothing product={product}/>)
                  }
                  
              </div>
              
          </div>
      </>
  )
}

function Women() {
  return (
    <>
        <Navbar/>
        <Allfeed/>
        <Womenfeed/>
        <Carouselfeed/>
        <Womenclothing/>
    </>
    
  )
}

export default Women
