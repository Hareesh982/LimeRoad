import React from 'react'
import { Link } from 'react-router-dom'
function Menfeed() {
    const women = [
        { wear: 'T-SHIRT', path: '/aspects/men_tshirt.jpg' },
        { wear: 'SHIRTS', path: '/aspects/men_shirt.jpg' },
        { wear: 'JEANS', path: '/aspects/men_jeans.jpg' },
        { wear: 'TROUSERS', path: '/aspects/men_trousers.jpg' },
        { wear: 'ETHNIC SETS', path: '/aspects/men_ethnic.jpg' },
        { wear: 'FOOTWEAR', path: '/aspects/men_footwear.jpg' },
        { wear: 'HOME', path: '/aspects/home.jpg' },
        { wear: 'ACCESSORY', path: '/aspects/men_access.jpg' },
        { wear: 'WINTER', path: '/aspects/men_winter.jpg' }
      ]
    return (
        <div className='d-flex justify-content-center' style={{margin:"10px 200px", gap:'25px'}}>
            <Link className="d-flex flex-column align-items-center" style={{textDecoration:'none',color:'black'}}>
                <img src='/aspects/myfeed.png' alt='kurthas' height={'60px'} width={'60px'} style={{borderRadius:'50%', padding:'2px',border:'2px solid lightgreen'}}/>
                <p style={{fontSize:'10px'}}>MY FEED</p>
            </Link>
    
            {
                women.map(item => {
                return <>
                    <Link className="d-flex flex-column align-items-center" style={{textDecoration:'none',color:'black'}}>
                    <img src={item.path} alt='kurthas' height={'60px'} width={'60px'} style={{borderRadius:'50%', padding:'5px'}}/>
                    <p style={{fontSize:'10px'}}>{item.wear}</p>
                    </Link>
                </>
                }
                )
            }
      </div>
    )
}

export default Menfeed