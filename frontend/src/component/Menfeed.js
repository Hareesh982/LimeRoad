import { Link } from 'react-router-dom';
import { useState } from 'react';

function Menfeed({ onSubCategoryChange }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleRefresh = () => {
    window.location.reload();
  };

  const men = [
    { wear: 'T-SHIRT',      path: '/aspects/men_tshirt.jpg',    subCategory: 'tshirt'    },
    { wear: 'SHIRTS',       path: '/aspects/men_shirt.jpg',     subCategory: 'shirts'    },
    { wear: 'JEANS',        path: '/aspects/men_jeans.jpg',     subCategory: 'jeans'     },
    { wear: 'TROUSERS',     path: '/aspects/men_trousers.jpg',  subCategory: 'trousers'  },
    { wear: 'ETHNIC SETS',  path: '/aspects/men_ethnic.jpg',    subCategory: 'ethnic'    },
    { wear: 'FOOTWEAR',     path: '/aspects/men_footwear.jpg',  subCategory: 'footwear'  },
    { wear: 'HOME',         path: '/aspects/home.jpg',          subCategory: 'home'      },
    { wear: 'ACCESSORY',    path: '/aspects/men_access.jpg',    subCategory: 'accessory' },
    { wear: 'WINTER',       path: '/aspects/men_winter.jpg',    subCategory: 'winter'    }
  ];

  return (
    <>
      <div className="container my-3">
        <div className="row justify-content-center align-items-center g-3">
          <div className="col-auto">
            <Link to="/men" className="d-flex flex-column align-items-center text-decoration-none text-dark" onClick={handleRefresh}>
              <img src="/aspects/myfeed.png" alt="kurthas"  height="80" width="80"
                style={{ borderRadius: '50%', border: '2px solid lightgreen', padding: '5px' }}
              />
              <p className="small" style={{ fontSize: '10px' }}>MY FEED</p>
            </Link>
          </div>

          {men.map((item, index) => (
            <div key={index} className="col-auto">
              <Link to="/men" className="d-flex flex-column align-items-center text-decoration-none text-dark" onClick={() => { onSubCategoryChange(item.subCategory); setSelectedIndex(index); }}>
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
  );
}

export default Menfeed;