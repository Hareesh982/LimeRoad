import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import './payment.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Paymentpage(){
    const cartCounter = useSelector(state => state.cart.cartCounter);
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const deliveryCharges = useSelector(state => state.cart.deliveryCharges);
    const taxes = useSelector(state => state.cart.taxes);
    const grandTotal = useSelector(state => state.cart.grandTotal);

    const [MobileError, setMobileError] = useState("");
    const navigate = useNavigate()

    let [formData,setFormData] = useState({
        pincode : '',
        mobile : '',
        fullname : '',
        area : '',
        landmark : '',
        city : '',
        state : '',
        addresstype : ''
    })

    const handleMobile = (event) => {
        const value = event.target.value;
        if (!/^\d+$/.test(value)) {
            setMobileError("Only numbers are allowed");
        } else if (value.length !== 10) {
            setMobileError("Enter a 10-digit mobile number");
        } else {
            setMobileError("");
        }
    };

    const handleChange = (event) =>{
        setFormData({...formData, [event.target.name] : event.target.value})
    } 

    const handleSubmit = async(event) =>{
        event.preventDefault()
        let token = localStorage.getItem('token')
        if(token){
            try{
                let response = await axios.put('http://localhost:3005/api/customeraddress',formData,{
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                alert(response.data.message)
            }
            catch(error){
                alert(error.response?.data?.message)
            }
        }
        else{
            Swal.fire({
                title : 'Error',
                text : 'You are not logged in',
                confirmButtonText: "Click to login",
                allowOutsideClick : 'false',
                icon : 'error',
            }).then((result) =>{
                if(result.isConfirmed){
                    navigate('/login')
                }
            })
        }
    }

    return (
        <>
            <div className='container'>
                <form className='row' onSubmit={handleSubmit}>
                    <div className='col-md-5 mt-4'>
                        <p>Please Fill Address For Shipping</p>
                        <div className='p-4 bg-white'>
                            <div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label className='labeldata' for='pincode'>Pincode *</label>
                                        <input onChange={handleChange} name='pincode' value={formData.pincode} className='inputdata' type='text' required id='pincode' style={{width:'100%'}}/>
                                    </div>
                                    <div className='col-6'>
                                        <label className='labeldata' for='mobile'>Mobile Number *</label>
                                        <input onChange={(event) => {handleChange(event); handleMobile(event);}} name='mobile' value={formData.mobile} className='inputdata' type='text' required id='mobile' style={{width:'100%'}}/>
                                        {MobileError && <small style={{ color: 'red', marginTop: '5px', fontSize:'10px' }}>{MobileError}</small>}
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-12'>
                                        <label className='labeldata' for='fullname'>Full Name *</label>
                                        <input onChange={handleChange} name='fullname' value={formData.fullname} className='inputdata' type='text' required id='fullname' style={{width:'100%'}} />
                                    </div>
                                </div>
                                <div className='row mt-5'>
                                    <div className='col-12'>
                                        <label for='address' className='text-secondary'>Locality/Area* <br/><span className='labeldata'>Flat / House No. / Building Name*</span></label>
                                        <input onChange={handleChange} name='area' value={formData.area} className='inputdata' type='text' required id='address' style={{width:'100%'}} />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-12'>
                                        <label className='labeldata' for='landmark'>Building/Street/Landmark*</label>
                                        <input onChange={handleChange} name='landmark' value={formData.landmark} className='inputdata' type='text' required id='landmark' style={{width:'100%'}} />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-6'>
                                        <label className='labeldata' for='city'>City *</label>
                                        <input onChange={handleChange} name='city' value={formData.city} className='inputdata' type='text' required id='city' style={{width:'100%'}}/>
                                    </div>
                                    <div className='col-6'>
                                        <label className='labeldata' for='state'>State *</label>
                                        <input onChange={handleChange} name='state' value={formData.state} className='inputdata' type='text' required id='state' style={{width:'100%'}}/>
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <p className='text-secondary' style={{fontSize:'12px'}}>Address type</p>
                                    <div className='col-6 d-flex align-items-center gap-2'>
                                        <input  onChange={(event) => handleChange(event)}  type='radio' name='addresstype' required value='home' id='home'/>
                                        <label  htmlFor='home'>Home</label>
                                    </div>
                                    <div className='col-6 d-flex align-items-center gap-2'>
                                        <input  onChange={(event) => handleChange(event)}  type='radio' name='addresstype' required value='work' id='work'/>
                                        <label htmlFor='work' >work</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='mt-4'>Cart Items ({cartCounter})</p>
                            <div className='bg-white'>
                                <div>
                                    {cartItems.map(item => (
                                        <div className='d-flex gap-3'>
                                            <img src={item.image} alt={item.title} style={{width:"75px", height:"100px"}}/>   
                                            <div className='d-flex flex-column'>
                                                <small style={{fontSize:'12px'}}>{item.title}</small>
                                                <small style={{fontSize:'12px'}}>Quantity : {item.quantity}</small>
                                                <small className='d-flex gap-2'>
                                                    <i className='bi bi-truck text-danger'></i>
                                                    <small>3-5 business days</small>
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link to='/cart' style={{textDecoration:'none',color:'black'}} className='d-flex justify-content-center align-items-center'>
                                    <p>EDIT CART</p>
                                </Link>
                            </div>
                        </div>
                        <div className='text-center mt-5' style={{fontSize:'12px',color:'grey'}}>
                            <p>Limeroad is offered in : हिन्दी</p>
                            <p>For order related queries, please use our need help section in My Orders</p>
                        </div>
                    </div>
                    
                    <div className='col-md-7 bg-white'>
                        <div className='py-4 px-5'>
                            <p className='text-secondary'>Payment Mode</p>
                            <div className='row'>
                                <div className='col-md-5'>
                                    <div>
                                        <p className='payment-option'>Cash on Delivery</p>
                                        <p className='payment-option'>ATM / Debit Card</p>
                                        <p className='payment-option'>Credit Card</p>
                                        <p className='payment-option'>Net Banking</p>
                                    </div>
                                </div>
                                <div className='col-md-7'>
                                    <div className='border rounded p-2'>
                                        <p>Order Details</p>
                                        <div className='p-1'>
                                            <div className='d-flex justify-content-between'>
                                                <span className='card-price'>Total price</span>
                                                <span className='card-price'>Rs.{totalPrice.toFixed(2)}</span>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <span className='card-price'>Shipping Charges</span>
                                                <span className='card-price'>Rs.{deliveryCharges}</span>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <span className='card-price'>Handling Charges</span>
                                                <span className='card-price'>Rs.{taxes.toFixed(2)}</span>
                                            </div>
                                            <hr/>
                                            <div className='d-flex justify-content-between'>
                                                <span style={{color:'rgb(217, 26, 26)'}}>Amount Payable</span>
                                                <span>Rs.{grandTotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className='payment-button' type='submit'>
                                        confirm order <span>${grandTotal.toFixed(2)}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

function Payment() {
  return (
    <>
        <Navbar/>
        <Paymentpage/>
    </>
  )
}

export default Payment