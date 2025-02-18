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
        className="d-flex col-3 flex-column justify-content-start"
        style={{
          height: '500px',
          width: '300px',
          margin: '10px',
        }}
        >
        <Link onClick={handleCurrentProduct} to={{ pathname: '/details' }} style={{ width: '100%', height: '80%',position:'relative' }}>
          <img src={product.image} alt='...' width='100%' height='100%' style={{ objectFit: "cover", borderRadius: '10px' }} />
          <p className='px-3' style={{position:'absolute',borderBottomRightRadius:'10px',borderTopRightRadius:'10px', bottom:'50px',left:'0px',color:'black',backgroundColor:'white'}}>new arrival</p>
        </Link>

        <div className='mt-2 d-flex align-items-center gap-2'>
          <span style={{ border: '1px solid limegreen', color: 'limegreen', borderRadius: '5px', fontSize: '12px', padding: '3px 5px' }}>OFFER</span>
          <span style={{ fontSize: '13px', color: 'limegreen' }}>Deals</span>
        </div><hr />
        <div className='d-flex align-items-center justify-content-around'>
          <span>${product.price}</span>
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
  let new_data = data;

  useEffect(() => {
    axios.get('/product.json')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const applyFilters = (products) => {
    if (filters.low) {
      return products.filter(product => product.price < 100);
    }
    if (filters.medium) {
      return products.filter(product => product.price >= 100 && product.price < 200);
    }
    if (filters.high) {
      return products.filter(product => product.price >= 200);
    }
    return products;
  };

  if (subcategory) {
    new_data = data.filter(product => product.category === category && product.subcategory === subcategory);
  } else if (routeSubcategory) {
    new_data = data.filter(product => product.category === category && product.subcategory === routeSubcategory);
    new_data = applyFilters(new_data);
  } else {
    new_data = data.filter(product => product.category === category);
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
                    <input type="checkbox" name="price" onChange={() => handleFilterChange('low')} /> &lt; $100
                  </label>
                  <label>
                    <input type="checkbox" name="price" onChange={() => handleFilterChange('medium')} /> $100 & $200
                  </label>
                  <label>
                    <input type="checkbox" name="price" onChange={() => handleFilterChange('high')} /> &gt; $200
                  </label>
                </div>
              </div>
            </div>
          )}
          <div className={routeSubcategory ? "col-md-9" : "col-md-12"}>
            <div className='row'>
              {new_data.length > 0 ? (
                new_data.map(product => <Clothing key={product.id} product={product} />)
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

function Womenclothing() {
  return (
    <>
      <Navbar />
      <Clothingfetch category="women" />
    </>
  );
}

export default Womenclothing;
