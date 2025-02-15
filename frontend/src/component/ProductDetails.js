import React from 'react'
import './ProductDetails.css'

function ProductDetails({product}) {
    return (
        <>
        <section id="product-info">

        <div className="item-image-parent">
            <div className="item-image-main">
                <img src={product.image} alt="default" style={{height:"40rem"}}/>
            </div>
        </div>

        <div className="item-info-parent"  style={{margin:"50px"}}>
            <div className="main-info">
                <h4>{product.title}</h4>
                <div className="star-rating">
                    <span>{product.rating.rate}</span>          
                </div><br/>
                <p>Price: <span id="price" style={{backgroundColor:"lightgrey", padding:'5px', borderRadius:"10px"}}>${product.price}</span></p>
            </div>
            <div className="select-items">
                <div className="change-size" style={{fontFamily:"verdana"}}>
                    {product.category}
                </div><br/>

                <div className="description">
                    {product.description}
                </div>
                <div>
                    <button className='product-details-button'>Add to cart</button><br/>
                    <button className='product-details-button'>Buy now</button>
                </div>
            </div>
        </div>
    </section>
    </>
    )
}

export default ProductDetails