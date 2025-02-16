import React, { useEffect,useState } from 'react'
import Navbar from '../component/Navbar'
import Allfeed from '../component/Allfeed'
import Womenfeed from '../component/Womenfeed'
import Carouselfeed from '../carousel/Carouselfeed'
import Mainbanner from '../component/Mainbanner'
import Productitem from '../component/Productitem'

function Womenhomedata({subCategory}){
  let [data, setData] = useState([]);
  useEffect(() => {
    fetch("/seller.json")
      .then(response => response.json())
      .then(productdata => {
        const womenProducts = productdata.filter(product => product.category === 'women' && (!subCategory || product.sub_category === subCategory))
        setData(womenProducts)
      })
  }, [subCategory])
  
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
