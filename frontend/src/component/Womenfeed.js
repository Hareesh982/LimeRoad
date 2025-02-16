import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Womenfeed({onSubCategoryChange}) {
     const [selectedIndex, setSelectedIndex] = useState(null);

    const women = [
        { wear: 'KURTHAS', path: '/aspects/women_kurthas.jpg', subCategory: 'kurthas' },
        { wear: 'TOPS', path: '/aspects/women_tops.jpg',subCategory: 'tops' },
        { wear: 'ETHNIC', path: '/aspects/women_ethnic.jpg', subCategory:'ethnic' },
        { wear: 'SAREES', path: '/aspects/women_sarees.jpg', subCategory: 'sarees' },
        { wear: 'DRESSES', path: '/aspects/women_dresses.jpg', subCategory: 'dresses' },
        { wear: 'SUITS', path: '/aspects/women_suites.jpg', subCategory: 'suits' },
        { wear: 'BOTTOMS', path: '/aspects/women_bottoms.jpg', subCategory: 'bottoms' },
        { wear: 'BAGS', path: '/aspects/women_bags.jpg', subCategory: 'bags' },
        { wear: 'FOOTWEAR', path: '/aspects/women_footwear.jpg',subCategory: 'footwear' },
        { wear: 'ADDONS', path: '/aspects/women_addons.jpg',subCategory: 'addons' },
        { wear: 'HOME', path: '/aspects/home.jpg',subCategory: 'home' },
        { wear: 'WINTER', path: '/aspects/winter.jpg',subCategory: 'winter' },
        { wear: 'LINGERIE', path: '/aspects/women_lingerie.jpg', subCategory: 'lingerie' },
      ]

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center g-3">
                <div className="col-auto">
                    <Link to="/" className="d-flex flex-column align-items-center text-decoration-none text-dark" >
                        <img src="/aspects/myfeed.png" alt="kurthas" height="80" width="80" 
                            style={{ borderRadius: '50%', border: '2px solid lightgreen', padding: '5px' }} 
                        />
                        <p className="small" style={{fontSize:'10px'}}>MY FEED</p>
                    </Link>
                </div>

                {women.map((item, index) => (
                    <div key={index} className="col-auto">
                        <Link to="/" className="d-flex flex-column align-items-center text-decoration-none text-dark" onClick={() => {onSubCategoryChange(item.subCategory); setSelectedIndex(index);}}>
                            <img src={item.path} alt="kurthas" height="65px" width="65px" 
                                style={{ borderRadius: '50%', padding: '5px' ,border: selectedIndex === index ? '2px solid lightgreen' : 'none'}} 
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