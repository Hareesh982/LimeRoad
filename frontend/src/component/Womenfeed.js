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
        { wear: 'WINTER', path: '/aspects/winter.jpg' },
        { wear: 'LINGERIE', path: '/aspects/women_lingerie.jpg'}
      ]
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center g-3">
                <div className="col-auto">
                    <Link to="/" className="d-flex flex-column align-items-center text-decoration-none text-dark">
                        <img src="/aspects/myfeed.png" alt="kurthas" height="80" width="80" 
                            style={{ borderRadius: '50%', border: '2px solid lightgreen', padding: '5px' }} 
                        />
                        <p className="small" style={{fontSize:'10px'}}>MY FEED</p>
                    </Link>
                </div>

                {women.map((item, index) => (
                    <div key={index} className="col-auto">
                        <Link to="/" className="d-flex flex-column align-items-center text-decoration-none text-dark">
                            <img src={item.path} alt="kurthas" height="65px" width="65px" 
                                style={{ borderRadius: '50%', padding: '5px' }} 
                            />
                            <p className="small" style={{fontSize:'10px'}}>{item.wear}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Womenfeed