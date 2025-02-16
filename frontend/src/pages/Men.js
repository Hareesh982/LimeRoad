import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import Menfeed from '../component/Menfeed';
import Allfeed from '../component/Allfeed';
import Carouselfeed from '../carousel/Carouselfeed';
import Productitem from '../component/Productitem';

function MenHomedata({ subCategory }) {
  let [data, setData] = useState([]);

  useEffect(() => {
    fetch("/seller.json")
      .then(response => response.json())
      .then(productdata => {
        const menProducts = productdata.filter(product => product.category === "men" && (!subCategory || product.sub_category === subCategory));
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