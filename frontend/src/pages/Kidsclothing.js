import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';
import setCurrentProduct from '../actions/setCurrentProduct'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

function Clothing({ product }) {
  let dispatch = useDispatch()

    let handleCurrentProduct = () =>{
        dispatch(setCurrentProduct(product))
    }

  return (
    <>
      <div 
        className="d-flex flex-column justify-content-start" 
        style={{
          height: '500px',
          width: 'calc(25% - 20px)',
          margin: '10px', 
        }}
      >
        <Link onClick={handleCurrentProduct} to={{pathname : '/details'}} style={{ width:'100%', height:'80%'}}>
                <img src={product.image} alt='...'  width='100%' height='100%' style={{ objectFit: "cover" }} />
              </Link>
        <div className='mt-2 d-flex align-items-center gap-2'>
          <span style={{border:'1px solid limegreen',color:'limegreen',borderRadius:'5px', fontSize:'12px',padding:'3px 5px'}}>OFFER</span>
          <span style={{fontSize:'13px',color:'limegreen'}}>Deals</span>
        </div><hr/>
        <div className='d-flex align-items-center justify-content-around'>
          <span>${product.price}</span>
          <span className='d-flex gap-2'>
            {product.rating.rate}
            <i className="bi bi-star-fill" style={{color:'yellowgreen'}}></i>
          </span>
          <span className='d-flex gap-2 align-items-center'>
            <i className="bi bi-heart" style={{color:'red'}}></i>
            <i className="bi bi-whatsapp" style={{color:'green'}}></i>
          </span>
        </div>
      </div>
    </>
  )
}

function Kidsclothing() {
  let [data, setData] = useState([]);
  useEffect(() => {
    axios.get('/product.json')
      .then(response => setData(response.data));
  }, []);
  let new_data = data.filter(product => product.category === "kids");

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {
            new_data.map(product => <Clothing key={product.id} product={product} />)
          }
        </div>
      </div>
    </>
  )
}

export default Kidsclothing;