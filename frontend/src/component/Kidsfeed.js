import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

function Kidsfeed({onSubCategoryChange}) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    
      const handleRefresh = () => {
        window.location.reload();
      };

    const kids = [
        {wear: 'FROKS',         path: '/aspects/kids_girl_froks.jpg',       subCategory: 'frocks'   },
        {wear: 'TWIN SETS',     path: '/aspects/kids_girl_twin_sets.jpg',   subCategory: 'twinsets' },
        {wear: 'TWIN SETS',     path: '/aspects/kids_boy_twin_sets.jpg',    subCategory: 'twinsets' },
        {wear: 'T SHIRTS',      path: '/aspects/kids_boy_tshirts.jpg',      subCategory: 'tshirts'  },
        {wear: 'SHIRTS',        path: '/aspects/kids_boy_shirts.jpeg',      subCategory: 'shirts'   },
        {wear: 'BOTTOM',        path: '/aspects/kids_boy_bottoms.jpg',      subCategory: 'bottoms'  },
        {wear: 'TOPS',          path: '/aspects/kids_girl_tops.jpg',        subCategory: 'tops'     },
        {wear: 'ETHNIC WEAR',   path: '/aspects/kids_girl_ethnic.jpg',      subCategory: 'ethnic'   },
        {wear: 'BOTTOM',        path: '/aspects/kids_girl_bottom.jpg',      subCategory: 'bottoms'  },
        {wear: 'WINTERWEAR',    path: '/aspects/kids_winter.jpg',           subCategory: 'winter'   },
        {wear: 'LOUNGEWEAR',    path: '/aspects/kids_girl_lounge.jpg',      subCategory: 'lounge'   },
        {wear: 'HOME',          path: '/aspects/home.jpg',                  subCategory: 'home'     },
        {wear: 'LOUNGEWEAR',    path: '/aspects/kids_boy_lounge.jpg',       subCategory: 'lounge'   }
      ]
      
    return (
        <>
            <div className="container my-3">
                <div className="row justify-content-center align-items-center g-3">
                <div className="col-auto">
                    <Link to="/kids" className="d-flex flex-column align-items-center text-decoration-none text-dark" onClick={handleRefresh}>
                    <img src="/aspects/myfeed.png" alt="kurthas"  height="80" width="80"
                        style={{ borderRadius: '50%', border: '2px solid lightgreen', padding: '5px' }}
                    />
                    <p className="small" style={{ fontSize: '10px' }}>MY FEED</p>
                    </Link>
                </div>

                {kids.map((item, index) => (
                    <div key={index} className="col-auto">
                    <Link to="/kids" className="d-flex flex-column align-items-center text-decoration-none text-dark" onClick={() => { onSubCategoryChange(item.subCategory); setSelectedIndex(index); }}>
                        <img src={item.path} alt={item.wear} height="65px" width="65px"
                        style={{ borderRadius: '50%', padding: '5px', border: selectedIndex === index ? '2px solid lightgreen' : 'none' }}
                        />
                        <p className="small" style={{ fontSize: '10px' }}>{item.wear}</p>
                    </Link>
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default Kidsfeed