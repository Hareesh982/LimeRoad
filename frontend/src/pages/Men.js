import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import Menfeed from '../component/Menfeed';
import Allfeed from '../component/Allfeed';
import Carouselfeed from '../carousel/Carouselfeed';
import Productitem from '../component/Productitem';
import axios from 'axios'

function MenHomedata({ subCategory }) {
  let [data, setData] = useState([]);

  useEffect(() => {
    let SellerData = async() =>{
      try{
        let response = await axios.get("http://127.0.0.1:3005/seller-card")
        let menProducts = response.data.user
        const sellerData = menProducts.filter(product => product.category === "men" && (!subCategory || product.sub_category === subCategory));
        setData(sellerData);
      }
      catch(error){
        alert(error.response?.data?.message)
      }
    }
    SellerData()
  }, [subCategory]);

  return (
    <>
      <div className='container mt-5'>
        <div className='row d-flex justify-content-center'>
          { 
            data.map((product) => <Productitem key={product.id} product={product} />)
          }
        </div>
      </div>
    </>
  );
}

function Men() {
  const [subCategory, setSubCategory] = useState('');

  const handleSubCategoryChange = (newSubCategory) => {
    setSubCategory(newSubCategory);
  };

  return (
    <>
      <Navbar />
      <Allfeed />
      <Menfeed onSubCategoryChange={handleSubCategoryChange} />
      <Carouselfeed />
      <MenHomedata subCategory={subCategory} />
    </>
  );
}

export default Men;