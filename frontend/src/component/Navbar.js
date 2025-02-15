import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Navbar.css'

let Profile = () =>{
    return (
        <div style={{ 
            display:'flex',
            flexDirection:'column',
            padding: "20px", 
            backgroundColor: "white", 
            position: "absolute", 
            top: "40px", 
            left: "-370%", 
            zIndex: "1000", 
            width:'270px',
            height:'auto',
            boxShadow: '1px 4px 4px rgba(0, 0, 0, 0.1)'
            }}>
            <span style={{fontSize:'12px',fontWeight:'bold'}}>WELCOME!</span>
            <span style={{fontSize:'12px'}}>To view account Details</span>
            <div style={{paddingTop:'10px'}}>
                <span style={{fontSize:'14px',backgroundImage: "linear-gradient(to right, red, red)",borderRadius:'5px', padding:'3px 5px',color:'white'}}>
                    <Link to='/login'>LOGIN</Link>
                </span><hr/>
            </div>
            <span style={{fontSize:'12px'}}>ORDERS</span>
            <span style={{fontSize:'12px'}}>RETURN REPLACEMENT</span>
            <span style={{fontSize:'12px'}}>LR CREDITS</span><hr/>
            <span style={{fontSize:'12px'}}>CUSTOMER SUPPORT</span>
            <span style={{fontSize:'12px'}}>FAQ & HELP</span>
        </div>
    )
}

function Navbar() {
    const [showProfile, setShowProfile] = useState(false);
    return (
        <>
        <nav className="navbar navbar-expand-lg d-flex g-5 justify-content-center">
                <div>
                    <Link className="navbar-brand" to="/">
                        <img 
                            src='logo.png' 
                            alt='logo'
                            height={"60px"}
                            width={"115px"}
                        />
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav d-flex">
                    <li className="nav-item dropdown">
                        <Link className="nav-link" to="/women-clothing">WOMEN</Link>
                        <ul className="dropdown-menu fixed-dropdown">
                            <div>
                                <p className='major-category'>Casual Wear</p>
                                <Link className="dropdown-item" to="/women/tops">Tops</Link>
                                <Link className="dropdown-item" to="/women/dresses">Dresses</Link>
                                <Link className="dropdown-item" to="/women/jeans">Jeans</Link>
                                <Link className="dropdown-item" to="/women/shoes">Shoes</Link>
                                <Link className="dropdown-item" to="/women/bags">Bags</Link>
                            </div>
                            <div>
                                <p className='major-category'>DailyWear</p>
                                <li><Link className="dropdown-item" to="/women/accessories">Accessories</Link></li>
                                <li><Link className="dropdown-item" to="/women/jackets">Jackets</Link></li>
                                <li><Link className="dropdown-item" to="/women/skirts">Skirts</Link></li>
                                <li><Link className="dropdown-item" to="/women/sleepwear">Sleepwear</Link></li>
                                <li><Link className="dropdown-item" to="/women/activewear">Activewear</Link></li>
                            </div>
                        </ul>
                    </li>

                    <li className="nav-item dropdown">
                        <Link className="nav-link" to="/men-clothing">MEN</Link>
                        <ul className="dropdown-menu fixed-dropdown">
                            <div>
                                <p className='major-category'>Regular</p>
                                <li><Link className="dropdown-item" to="/men/shirts">Shirts</Link></li>
                                <li><Link className="dropdown-item" to="/men/pants">Pants</Link></li>
                                <li><Link className="dropdown-item" to="/men/kurtas">Kurtas</Link></li>
                                <li><Link className="dropdown-item" to="/men/jeans">Jeans</Link></li>
                            </div>
                        </ul>
                    </li>

                    <li className="nav-item dropdown">
                        <Link className="nav-link" to="/kids-clothing">KIDS</Link>
                        <ul className="dropdown-menu fixed-dropdown">
                            <div>
                                <p className='major-category'>Regular wear</p>
                                <li><Link className="dropdown-item" to="/kids/shirts">Shirts</Link></li>
                                <li><Link className="dropdown-item" to="/kids/pants">Pants</Link></li>
                                <li><Link className="dropdown-item" to="/kids/toys">Toys</Link></li>
                                <li><Link className="dropdown-item" to="/kids/caps">Caps</Link></li>
                            </div>
                        </ul>
                    </li>
                    <Link className="nav-link" to="/">HOME</Link>
                    <Link className="nav-link offers" to="/offers">OFFERS</Link>
                    <Link className="nav-link vmart" to="/vmart">VMART</Link>
                </ul>
                </div>
                <div className="icons">
                    <Link to="#">
                        <div className='d-flex flex-column align-items-center'>
                            <i className="bi bi-pencil-fill"></i>
                            SCRAPBOOK
                        </div>
                    </Link>
                    <Link to="#" className='d-flex flex-column align-items-center'>
                        <i className="bi bi-search"></i> 
                        SEARCH
                    </Link>




                    <Link to="/cart" className="cart-icon d-flex flex-column align-items-center ">
                        <i className="bi bi-cart-fill"></i> 
                        CART
                        <span className="cart-badge">3</span>
                    </Link>


                    <div 
                        style={{ position: "relative" }} 
                        onMouseEnter={() => setShowProfile(true)}
                        onMouseLeave={() => setShowProfile(false)}
                    >
                        <Link className="cart-icon d-flex flex-column align-items-center">
                            <i className="bi bi-person-fill"></i>
                            PROFILE
                        </Link>

                        {showProfile && <Profile />}
                    </div>

                </div>
        </nav>

        <Outlet/>
    </>
  )
}

export default Navbar