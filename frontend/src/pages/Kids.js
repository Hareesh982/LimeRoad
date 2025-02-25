import React from 'react'
import Navbar from '../component/Navbar'
import Allfeed from '../component/Allfeed'
import Carouselfeed from '../carousel/Carouselfeed'
import Kidsfeed from '../component/Kidsfeed'
import { useState,useEffect } from 'react'
import Productitem from '../component/Productitem'

function KidsHomedata({ subCategory }) {
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch("/seller.json")
      .then(response => response.json())
      .then(productdata => {
        const menProducts = productdata.filter(product => product.category === "kids" && (!subCategory || product.sub_category === subCategory));
        setData(menProducts);
      });
  }, [subCategory]);

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
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