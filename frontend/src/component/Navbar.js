import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Navbar.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

let Profile = ({user}) =>{
    let navigate = useNavigate()
    let handleLogout = () => {
        localStorage.removeItem('token')
        user = null
        Swal.fire({
            title : 'You have been logged out',
            icon : 'success',
            allowOutsideClick : false,
            confirmButtonText : 'Click to continue'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login'); 
                window.location.reload()
            }
          });
    }

    return (

        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            padding: "20px", 
            backgroundColor: "white", 
            position: "absolute", 
            top: "40px", 
            left: "-300%", 
            zIndex: "1000", 
            width: '240px',
            height: 'auto',
            boxShadow: '1px 4px 4px rgba(0, 0, 0, 0.1)'
        }}>
            {
                user ? (
                    <>
                        <span style={{ fontSize: '12px' }}>WELCOME!</span>
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{user.name} / {user.userType}</span>
                        {
                            user.userType === 'vendor' ? (
                                <div className='mt-2'>
                                    <button style={{fontSize:'12px'}} onClick={() => {
                                        navigate('/vendorprofile'); 
                                        window.location.reload();
                                        }} 
                                        className='btn btn-info'>PROFILE</button>
                                    <hr/>
                                </div>
                            ):
                            (
                                <div className='mt-2'>
                                    <button style={{fontSize:'12px'}} onClick={() => {
                                        navigate('/customerprofile');
                                        window.location.reload()
                                    }} className='btn btn-info'>PROFILE</button>
                                    <hr/>
                                </div>
                            )
                        }
                        
                        <span style={{ fontSize: '12px' }}>ORDERS</span>
                        <span style={{ fontSize: '12px' }}>RETURN REPLACEMENT</span>
                        <span style={{ fontSize: '12px' }}>LR CREDITS</span><hr />
                        <span style={{ fontSize: '12px' }}>CUSTOMER SUPPORT</span>
                        <span style={{ fontSize: '12px' }}>FAQ & HELP</span>
                        <hr/>
                        <button onClick={handleLogout} className='btn btn-danger' style={{ fontSize: '12px' }}>LOGOUT</button>
                    </>
                ) : (
                    <>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>WELCOME!</span>
                        <span style={{ fontSize: '12px' }}>To view account Details</span>
                        <div className='mt-2'>
                            <button style={{fontSize:'12px'}} onClick={() => navigate('/login')} className='btn btn-danger'>LOGIN</button>
                        </div>
                        <hr/>
                        <span style={{ fontSize: '12px' }}>ORDERS</span>
                        <span style={{ fontSize: '12px' }}>RETURN REPLACEMENT</span>
                        <span style={{ fontSize: '12px' }}>LR CREDITS</span><hr />
                        <span style={{ fontSize: '12px' }}>CUSTOMER SUPPORT</span>
                        <span style={{ fontSize: '12px' }}>FAQ & HELP</span>
                    </>
                )
            }
        </div>
    );
}

function Navbar() {
    const cartCounter = useSelector(state => state.cart.cartCounter);
    const [search, setSearch] = useState(false);
    const [user, setUser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:3005/user-details', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Error fetching user details:', error.response ? error.response.data : error.message);
                }
            };

            fetchUserDetails();
        }
    }, []);

    return (
        <>
            {!search ? (
                <nav style={{padding:'5px 70px'}} className="navbar navbar-expand-lg d-flex g-5 justify-content-center">
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
                                <Link className="nav-link" to="/main-clothing?category=women">WOMEN</Link>
                                <ul className="dropdown-menu fixed-dropdown">
                                    <div>
                                        <p className='major-category'>Daily Wear</p>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=kurthas&category=women">Kurtas</Link></li>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=tops&category=women">Tops</Link></li>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=ethnic&category=women">ethnic</Link></li>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=sarees&category=women">sarees</Link></li>
                                    </div>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/main-clothing?category=men">MEN</Link>
                                <ul className="dropdown-menu fixed-dropdown">
                                    <div>
                                        <p className='major-category'>Daily Wear</p>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=tshirt&category=men">T-Shirts</Link></li>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=shirts&category=men">Shirts</Link></li>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=jeans&category=men">Jeans</Link></li>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=trousers&category=men">Trousers</Link></li>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=ethnic&category=men">Ethnic sets</Link></li>
                                    </div>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="/main-clothing?category=kids">KIDS</Link>
                                <ul className="dropdown-menu fixed-dropdown">
                                    <div>
                                        <p className='major-category'>Regular wear</p>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=frocks&category=kids">frocks</Link></li>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=bottoms&category=kids">Bottoms</Link></li>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=tops&category=kids">Tops</Link></li>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=shirts&category=kids">shirts</Link></li>
                                        <li><Link className="dropdown-item" to="/main-clothing?subcategory=caps&category=kids">caps</Link></li>
                                    </div>
                                </ul>
                            </li>
                            <Link className="nav-link" to="/home">HOME</Link>
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
                        <Link className="d-flex flex-column align-items-center"
                            onClick={() => { setSearch(true) }}>
                            <i className="bi bi-search"></i>
                            Search
                        </Link>

                        <Link to="/cart" className="cart-icon d-flex flex-column align-items-center ">
                            <i className="bi bi-cart-fill"></i> 
                            CART
                            {
                                cartCounter ? <span className="cart-badge">{cartCounter}</span> : null
                            }
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

                            {showProfile && <Profile user={user} />}
                        </div>

                    </div>
                </nav>) : (
                <div className="search-overlay">
                    <div className="search-box">
                        <i className="bi bi-search"></i>
                        <input
                            type="text"
                            placeholder="Search for products"
                            className="search-input"
                            autoFocus
                        />
                    </div>
                    <button className="search-close" onClick={() => setSearch(false)}>✖</button>
                </div>
            )}

            <Outlet />
        </>
    )
}

export default Navbar;

