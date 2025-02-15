import React from 'react'
import { useSelector } from 'react-redux'
import ProductDetails from '../component/ProductDetails'
import Navbar from '../component/Navbar'

function Details() {
    let product = useSelector((state) => state.currentProduct.product)
    return (
        <>
            <Navbar/>

            <div className='container mt-5'>
                <ProductDetails product={product}/>
            </div>
        </>
    )
}

export default Details