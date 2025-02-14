import React from 'react'
import { useState,useEffect } from 'react';
import Navbar from '../component/Navbar'
import Womenfeed from '../component/Womenfeed';
import Allfeed from '../component/Allfeed';

import Mainbanner from '../component/Mainbanner';
import Carouselfeed from '../carousel/Carouselfeed';
import Productitem from '../component/Productitem';

function Homedata(){
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



function Home() {
  
  return (
    <>
      <Navbar/>
      <Allfeed/>
      <Womenfeed/>
      <Carouselfeed/>
      <Mainbanner/>
      <Homedata/>
    </>
  );
}

export default Home