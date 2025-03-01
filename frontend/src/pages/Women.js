import React, { useEffect,useState } from 'react'
import Navbar from '../component/Navbar'
import Allfeed from '../component/Allfeed'
import Womenfeed from '../component/Womenfeed'
import Carouselfeed from '../carousel/Carouselfeed'
import Mainbanner from '../component/Mainbanner'
import Productitem from '../component/Productitem'
import axios from 'axios'

function Womenhomedata({subCategory}){
  let [data, setData] = useState([]);

  useEffect(() => {
    let SellerData = async() =>{
      try{
        let response = await axios.get("http://127.0.0.1:3005/seller-card")
        let womenProducts = response.data.user
        const sellerData = womenProducts.filter(product => product.category === "women" && (!subCategory || product.sub_category === subCategory));
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
      <div className='container mt-5 justify-content-center'>
        <div className='row d-flex justify-content-center'>
          {
            data.map((product) => <Productitem key={product.id} product={product} />)
          }
        </div>
      </div>
    </>
  )
}

function Women() {

  let [subCategory, setSubCategory] = useState('');
  let handleSubCategoryChange = (newSubCategory) => { 
    setSubCategory(newSubCategory);
  }


  return (
    <>
        <Navbar/>
        <Allfeed/>
        <Womenfeed onSubCategoryChange = {handleSubCategoryChange}/>
        <Carouselfeed/>
        <Mainbanner/>
        <Womenhomedata subCategory={subCategory}/>
        
    </>
    
  )
}

export default Women
