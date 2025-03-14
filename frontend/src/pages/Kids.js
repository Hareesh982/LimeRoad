import React from 'react'
import Navbar from '../component/Navbar'
import Allfeed from '../component/Allfeed'
import Carouselfeed from '../carousel/Carouselfeed'
import Kidsfeed from '../component/Kidsfeed'
import { useState,useEffect } from 'react'
import Productitem from '../component/Productitem'
import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL;

function KidsHomedata({ subCategory }) {
  let [data, setData] = useState([]);

  useEffect(() => {
    let SellerData = async() =>{
      try{
        let response = await axios.get(`${apiUrl}/seller-card`)
        let kidProducts = response.data.user
        const sellerData = kidProducts.filter(product => product.category === "kids" && (!subCategory || product.sub_category === subCategory));
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

function Kids() {
  const [subCategory, setSubCategory] = useState('');
  
    const handleSubCategoryChange = (newSubCategory) => {
      setSubCategory(newSubCategory);
    };
  return (
    <>
        <Navbar/>
        <Allfeed/>
        <Kidsfeed onSubCategoryChange={handleSubCategoryChange}/>
        <Carouselfeed/>
        <KidsHomedata subCategory={subCategory} />
    </>
    
  )
}

export default Kids