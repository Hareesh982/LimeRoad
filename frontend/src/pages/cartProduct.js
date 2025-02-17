import { useSelector } from "react-redux";
import Navbar from "../component/Navbar";
import React from "react";
import { Link } from "react-router-dom";

function CartDetails() {
    const cartItems = useSelector(state => state.cart.cartItems);
    // const cartCounter = useSelector(state => state.cart.cartCounter);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const deliveryCharges = useSelector(state => state.cart.deliveryCharges);
    const taxes = useSelector(state => state.cart.taxes);
    const grandTotal = useSelector(state => state.cart.grandTotal);

    return (
        <>
        <Navbar />
            <div className="container bg-white" style={{borderRadius:'10px'}}>
                {cartItems.length ?  
                    <div className='row mt-4'>
                        <div className="col-md-6">
                            <div >
                                {cartItems.map(item => (
                                    <div className="row py-2" key={item.id}>
                                        <div className='col-md-9 d-flex'>
                                            <img src={item.image} alt={item.title} style={{width:"150px", height:"200px", borderRadius:'5px'}}/>
                                            <div>
                                                <p className='px-3'>{item.title}</p>
                                                <p className='px-3' style={{fontSize:'12px'}}>{item.description}</p>
                                                <p className="px-3">${item.price}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-2">
                                            <p className="text-end">Quantity : {item.quantity}</p>
                                        </div>
                                        <div className='col-md-1'>
                                            <p className="text-end">${item.total_item_price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='col-md-1'>
                                
                        </div>
                        <div className='col-md-5 my-4'>
                            <div className='shadow p-2 mx-2 pb-5'>
                                <div className='d-flex justify-content-between px-2'>
                                    <p> Sub Total </p> <p>${totalPrice.toFixed(2)}</p>
                                </div>
                                <div className='d-flex justify-content-between px-2'>
                                    <p> Delivery Charges </p> <p> ${deliveryCharges.toFixed(2)} </p>
                                </div>
                                <div className='d-flex justify-content-between px-2'>
                                    <p> Tax </p> <p> ${taxes.toFixed(2)} </p>
                                </div>
                                <div className='d-flex justify-content-between px-2'>
                                    <p> Total </p> <p> ${grandTotal.toFixed(2)}</p>
                                </div>
                                <Link className='float-end btn btn-danger' to="/payment">Checkout</Link>
                            </div>
                        </div>
                    </div>
                    :
                    <h1 className='text-center mt-5 pt-5'>No Items in your Cart</h1>
                }
            </div>
        </>
    );
}

export default CartDetails;