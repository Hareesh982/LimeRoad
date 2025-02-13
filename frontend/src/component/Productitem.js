import React from 'react'
import './productitem.css'
function Productitem({product}) {
  return (
    <>
        <div class="container mt-4">
            <div class="card product-card p-2">
                <p>SHOP NOW!</p>
                
                <div class="row">
                    <div class="col-8 position-relative" style={{height:'250px'}}>
                        <img src={product.image} class="main-img img-fluid" alt="Main Product" />
                    </div>
                    <div class="col-4 d-flex flex-column gap-2" style={{height:'250px'}}>
                        <img src={product.image} class="small-img img-fluid" alt="1" />
                        <img src={product.image} class="small-img img-fluid" alt="2" />
                        <div class="position-relative">
                            <img src={product.image} class="small-img img-fluid" alt="More" />
                            <div class="overlay">+24</div>
                        </div>
                    </div>
                </div>
                
                <div class="d-flex align-items-center pt-2">
                    <img src={product.image} class="rounded-circle me-2" alt="User" height={'40px'} width={'40px'}/>
                    <div>
                        <span class="fw-bold">Trend Experts</span> <br/>
                        <small class="text-muted">6K Followers</small>
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                    <div class="text-muted"><span class="fw-bold">27</span> Likes</div>
                    <div>
                        <button class="icon-btn text-danger"><i class="bi bi-heart"></i></button>
                        <button class="icon-btn text-success"><i class="bi bi-whatsapp"></i></button>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default Productitem