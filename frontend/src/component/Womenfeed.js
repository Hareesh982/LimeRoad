import React from 'react'
import { Link } from 'react-router-dom'

function Womenfeed() {
    const women = [
        { wear: 'KURTHAS', path: '/aspects/women_kurthas.jpg' },
        { wear: 'DRESSES', path: '/aspects/women_dresses.jpg' },
        { wear: 'SAREES', path: '/aspects/women_sarees.jpg' },
        { wear: 'TOPS', path: '/aspects/women_tops.jpg' },
        { wear: 'SUITS', path: '/aspects/women_suites.jpg' },
        { wear: 'ETHNIC', path: '/aspects/women_ethnic.jpg' },
        { wear: 'BOTTOMS', path: '/aspects/women_bottoms.jpg' },
        { wear: 'BAGS', path: '/aspects/women_bags.jpg' },
        { wear: 'FOOTWEAR', path: '/aspects/women_footwear.jpg' },
        { wear: 'ADDONS', path: '/aspects/women_addons.jpg' },
        { wear: 'HOME', path: '/aspects/home.jpg' },
        { wear: 'WINTER', path: '/aspects/winter.jpg' }
      ]
    return (
        <div className='d-flex justify-content-center' style={{margin:"10px 200px", gap:'25px'}}>
            
            <Link className="d-flex flex-column align-items-center" style={{textDecoration:'none',color:'black'}}>
                <img src='/aspects/myfeed.png' alt='kurthas' height={'60px'} width={'60px'} style={{borderRadius:'50%',border:'2px solid lightgreen' ,padding:'2px'}}/>
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

export default Womenfeed