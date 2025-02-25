import { useSelector, useDispatch } from "react-redux";
import Navbar from "../component/Navbar";
import React from "react";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import setCurrentProduct from "../actions/setCurrentProduct";

function CartDetails() {
    let [showAlert, setShowAlert] = useState(false);

    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const deliveryCharges = useSelector(state => state.cart.deliveryCharges);
    const taxes = useSelector(state => state.cart.taxes);
    const grandTotal = useSelector(state => state.cart.grandTotal);
    const dispatch = useDispatch();

    const incrementQuantity = (_id) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { _id, quantity: cartItems.find(item => item._id === _id).quantity + 1 } });
    };

    const decrementQuantity = (_id) => {
        const currentQuantity = cartItems.find(item => item._id === _id).quantity;
        if (currentQuantity > 1) {
            dispatch({ type: "UPDATE_QUANTITY", payload: { _id, quantity: currentQuantity - 1 } });
        }
        else{
            dispatch({ type: "REMOVE_FROM_CART", payload: _id });
            setShowAlert(true);
    
            setTimeout(() => {
              setShowAlert(false);
            }, 1000);
        }
    };

    let handleCurrentProduct = (product) => {
        dispatch(setCurrentProduct(product));
      };

    const removeFromCart = (_id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: _id });
        setShowAlert(true);
    
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
    };

    

    return (
        <>
        {showAlert && (
            <Stack sx={{ width: 'auto', position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }} spacing={2}>
            <Alert variant="filled" severity="success">
                Product removed from the cart!
            </Alert>
            </Stack>
        )}
        <Navbar />
            <div className="container bg-white" style={{borderRadius:'10px'}}>
                {cartItems.length ?  
                    <div className='row mt-4'>
                        <div className="col-md-6">
                            <div >
                                {cartItems.map(item => (
                                    <div className="row py-2" key={item._id}>
                                        <div className='col-md-8 d-flex'>
                                            <Link to="/details">
                                                <img onClick={() => handleCurrentProduct(item)} src={item.image} alt={item.title} style={{width:"150px", height:"200px", borderRadius:'5px'}}/>   
                                            </Link>
                                            
                                            <div className='d-flex flex-column'>
                                                <p className='px-3'>{item.title}</p>
                                                <p className='px-3' style={{fontSize:'12px'}}>{item.description}</p>
                                                <p className="px-3">Rs.{item.price}</p>
                                                <div className="d-flex px-3 justify-content-start align-items-center gap-2">
                                                    <button className="btn btn-secondary d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }} onClick={() => decrementQuantity(item._id)}>-</button>
                                                    <p className="m-0">{item.quantity}</p>
                                                    <button className="btn btn-secondary d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }} onClick={() => incrementQuantity(item._id)}>+</button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <p className="">Total amount - ${item.total_item_price.toFixed(2)}</p>
                                            <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>Remove</button>
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