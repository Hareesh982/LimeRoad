import React from 'react'

function Footer() {
  return (
    <div className='container mt-5 mb-5' style={{fontSize:'14px'}}>
        <p className='text-center mb-5 fw-medium'>Limeroad is offered in : हिन्दी</p>
        <hr/>
        <div className='d-flex justify-content-center gap-5 fw-medium color-grey'>
            <div>
                <p>About Us</p>
                <p>Team</p>
                <p>Career</p>
                <p>FAQ</p>
                <p>Contact Us</p>
                <p>Settings</p>
            </div>
            <div>
                <p>Orders</p>
                <p>Shipping Cart</p>
                <p>Terms Of Use</p>
                <p>Privacy Police</p>
                <p>Return Policy</p>
                <p>Disclaimer</p>
            </div>
        </div>
        <hr/>
        <p className='text-center'>Copyright © 2025 Limeroad.com</p>
      </div>
  )
}

export default Footer