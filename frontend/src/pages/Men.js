import React from 'react'
import Navbar from '../component/Navbar'
import Menfeed from '../component/Menfeed'
import Allfeed from '../component/Allfeed'
import Carouselfeed from '../carousel/Carouselfeed'
import Productitem from '../component/Productitem'

import { useState,useEffect } from 'react';

function MenHomedata(){
  let [data,setData] = useState([])
  useEffect(() =>{
    fetch("/seller.json")
      .then(response => response.json())
      .then(productdata => setData(productdata))
  },[])

  return (
    <>
        <div className='container mt-5'>
          <div className='row'>
          { 
            data.map((product) => <Productitem key={product.id} product={product}/>)
          }
          </div>
        </div>
    </>
  )
}


function Men() {
  return (
    <>
        <Navbar/>
        <Allfeed/>
        <Menfeed/>
        <Carouselfeed/>
        <MenHomedata/>
    </>
    
  )
}

export default Men