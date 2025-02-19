import React from 'react'
import Navbar from '../component/Navbar'
import './payment.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Paymentpage(){
    const cartCounter = useSelector(state => state.cart.cartCounter);
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const deliveryCharges = useSelector(state => state.cart.deliveryCharges);
    const taxes = useSelector(state => state.cart.taxes);
    const grandTotal = useSelector(state => state.cart.grandTotal);
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-5 mt-4'>
                        <p>Please Fill Address For Shipping</p>
                        <div className='p-4 bg-white'>
                            <form>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label className='labeldata' for='pincode'>Pincode *</label>
                                        <input className='inputdata' type='text' id='pincode' style={{width:'100%'}}/>
                                    </div>
                                    <div className='col-6'>
                                        <label className='labeldata' for='mobile'>Mobile Number *</label>
                                        <input className='inputdata' type='text' id='mobile' style={{width:'100%'}}/>
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-12'>
                                        <label className='labeldata' for='fullname'>Full Name *</label>
                                        <input className='inputdata' type='text' id='fullname' style={{width:'100%'}} />
                                    </div>
                                </div>
                                <div className='row mt-5'>
                                    <div className='col-12'>
                                        <label for='address' className='text-secondary'>Locality/Area* <br/><span className='labeldata'>Flat / House No. / Building Name*</span></label>
                                        <input className='inputdata' type='text' id='address' style={{width:'100%'}} />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-12'>
                                        <label className='labeldata' for='landmark'>Building/Street/Landmark*</label>
                                        <input className='inputdata' type='text' id='landmark' style={{width:'100%'}} />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-6'>
                                        <label className='labeldata' for='city'>City *</label>
                                        <input className='inputdata' type='text' id='city' style={{width:'100%'}}/>
                                    </div>
                                    <div className='col-6'>
                                        <label className='labeldata' for='state'>State *</label>
                                        <input className='inputdata' type='text' id='state' style={{width:'100%'}}/>
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <p className='text-secondary' style={{fontSize:'12px'}}>Address type</p>
                                    <div className='col-6 d-flex align-items-center gap-2'>
                                        <input  type='radio' id='home'/>
                                        <label  for='home'>Home</label>
                                    </div>
                                    <div className='col-6 d-flex align-items-center gap-2'>
                                        <input  type='radio' id='office'/>
                                        <label for='office'>Office</label>
                                    </div>
                                </div>
                            </form>
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
                                                <span>${totalPrice.toFixed(2)}</span>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <span className='card-price'>Shipping Charges</span>
                                                <span>${deliveryCharges}</span>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <span className='card-price'>Handling Charges</span>
                                                <span>${taxes.toFixed(2)}</span>
                                            </div>
                                            <hr/>
                                            <div className='d-flex justify-content-between'>
                                                <span style={{color:'rgb(217, 26, 26)'}}>Amount Payable</span>
                                                <span>${grandTotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className='payment-button'>
                                        confirm order <span>${grandTotal.toFixed(2)}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
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