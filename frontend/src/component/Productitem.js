import React from 'react'
import { Link } from 'react-router-dom';


function Productitem({ product }) {
    
    return (

      <div 
        className="d-flex flex-column  justify-content-start" 
        style={{
          backgroundColor: 'white',
          height: '400px',
          width: 'calc(25% - 20px)',
          margin: '10px',
          position:'relative'
        }}
      >

          <p style={{margin:'5px'}}>{product.title}</p>


          <div className="d-flex" style={{ height: '80%'}}>
            {
              product.category === 'women' && (
                <Link to={`/women-clothing?subcategory=${product.sub_category}`}>
                  <img src={product.image}  alt="..." style={{ height: '100%',width:'100%'}}/>
                </Link>
              ) 
            }
            {
              product.category === 'men' && 
                (
                  <Link to={`/men-clothing?subcategory=${product.sub_category}`}>
                    <img src={product.image}  alt="..." style={{ height: '100%',width:'100%'}}/>
                  </Link>
                )
            }
          </div>




          <div className='d-flex align-items-center gap-2'>
            
              <img src={product.image} height='30px' width='30px' alt='...' style={{borderRadius:'50%'}}/>
              
              <div className='d-flex flex-column'>
                  <span style={{fontSize:'12px',fontWeight:'bold'}}>BY Trend Experts</span>
                  <span style={{fontSize:'12px'}}>{product.followers} followers</span>
              </div>
          </div>
          
          <div className='d-flex gap-2' style={{position:'absolute',bottom:'5px',right:'20px'}}>
              <div className='d-flex flex-column align-items-center'>
                  <div className='d-flex' style={{backgroundColor:'white', boxShadow: '1px 4px 4px rgba(0, 0, 0, 0.1)',width:'40px',height:'40px',alignItems:'center',justifyContent:'center',borderRadius:'50%'}}>
                      <i className="bi bi-heart fs-3" style={{color:'red'}}></i>
                  </div>
                  <p style={{fontSize:'12px'}}>{product.likes} likes</p>
              </div>
              <div className='d-flex flex-column align-items-center'>
                  <div className='d-flex' style={{backgroundColor:'white', boxShadow: '1px 4px 4px rgba(0, 0, 0, 0.1)',width:'40px',height:'40px',alignItems:'center',justifyContent:'center',borderRadius:'50%'}}>
                      <i className="bi bi-whatsapp fs-3" style={{color:'green'}}></i>
                  </div>
                  <p style={{fontSize:'12px'}}>share</p>
              </div>
          </div>
      </div>
    );
  }

  
  

export default Productitem