import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';
import setCurrentProduct from '../actions/setCurrentProduct';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

function Clothing({ product }) {
  let dispatch = useDispatch();

  let handleCurrentProduct = () => {
    dispatch(setCurrentProduct(product));
  };

  return (
    <>
      <div
        className="d-flex col-3 flex-column justify-content-center"
        style={{
          height: '450px',
          width: '300px',
          margin: '10px'
        }}
        >
        <Link  onClick={handleCurrentProduct} to={{ pathname: '/details' }} style={{ width: '100%', height: '80%',position:'relative' }}>
          <img src={product.image} alt='...' width='100%' height='100%' style={{ objectFit: "cover",borderTopLeftRadius:'10px',borderTopRightRadius:'10px' }} />
          <p className='px-3' style={{position:'absolute',borderBottomRightRadius:'10px',borderTopRightRadius:'10px', bottom:'50px',left:'0px',color:'black',backgroundColor:'white'}}>new arrival</p>
          <span className='px-3' style={{ position:'absolute', color: 'white', borderBottomRightRadius:'10px',borderTopRightRadius:'10px', bottom:'30px',left:'0px',backgroundColor:'yellowgreen', fontSize: '12px', padding: '3px 5px' }}>Get it now with 30% OFFER</span>
        </Link>
        <div className='d-flex bg-white p-1'>
          <span className='px-2 rounded'  style={{ color: 'limegreen', border:'1px solid limegreen', bottom:'30px',left:'0px', fontSize: '12px' }}>OFFER</span>
          <span className='px-2' style={{fontSize:'12px',color:'limegreen'}}>Deals</span>
        </div>
        
        <div className='d-flex w-100 justify-content-around py-1' style={{border:'1px solid white',backgroundColor:'white'}}>
          <span>Rs.{product.price}</span>
          <span className='d-flex gap-2'>
            {product.rating.rate}
            <i className="bi bi-star-fill" style={{ color: 'yellowgreen' }}></i>
          </span>

          <span className='d-flex gap-2 align-items-center'>
            <i className="bi bi-heart" style={{ color: 'red' }}></i>
            <i className="bi bi-whatsapp" style={{ color: 'green' }}></i>
          </span>
        </div>
      </div>
    </>
  );
}

export function Clothingfetch({ category, subcategory }) {
  let [data, setData] = useState([]);
  let [filters, setFilters] = useState({ low: false, medium: false, high: false });

  const [searchParams] = useSearchParams();
  const routeSubcategory = searchParams.get('subcategory');
  const routeCategory = searchParams.get('category');
  let new_data = data;

  useEffect(() => {
    let GetProductDetails = async() =>{
      try{
        let response = await axios.get('http://127.0.0.1:3005/clothing-details')
        setData(response.data.user)
      }
      catch(error){
        console.error('Error fetching data:', error)
      }
    }
    GetProductDetails()
      
  }, []);

  const applyFilters = (products) => {
    if (filters.low) {
      return products.filter(product => product.price < 1000);
    }
    if (filters.medium) {
      return products.filter(product => product.price >= 1000 && product.price < 3000);
    }
    if (filters.high) {
      return products.filter(product => product.price >= 5000);
    }
    return products;
  };

  if (subcategory) {
    new_data = data.filter(product => product.category === category && product.subcategory === subcategory);
  } else if (routeSubcategory) {
    new_data = data.filter(product => product.category === routeCategory && product.subcategory === routeSubcategory);
    new_data = applyFilters(new_data);
  } else {
    new_data = data.filter(product => product.category === routeCategory);
  }

  const handleFilterChange = (filter) => {
    setFilters(prevFilters => ({ ...prevFilters, [filter]: !prevFilters[filter] }));
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          {routeSubcategory && (
            <div className="col-md-3">
              <div className="p-3 mt-3 radius-10 shadow rounded d-flex flex-column">
                <h4>Filters</h4>
                <hr />
                <div className='d-flex flex-column gap-2'>
                  <p>Price Filters</p>
                  <label>
                    <input type="checkbox" name="price" onChange={() => handleFilterChange('low')} /> &lt; 1000
                  </label>
                  <label>
                    <input type="checkbox" name="price" onChange={() => handleFilterChange('medium')} /> 1000 & 3000
                  </label>
                  <label>
                    <input type="checkbox" name="price" onChange={() => handleFilterChange('high')} /> &gt; 5000
                  </label>
                </div>
              </div>
            </div>
          )}
          <div className={routeSubcategory ? "col-md-9" : "col-md-12"}>
            <div className='row'>
              {new_data.length > 0 ? (
                new_data.map(product => <Clothing key={product._id} product={product} />)
              ) : (
                <p>No products in this section.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Mainclothing() {
  return (
    <>
      <Navbar />
      <Clothingfetch/>
    </>
  );
}

export default Mainclothing;
