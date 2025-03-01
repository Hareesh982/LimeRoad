import { useEffect } from "react";
import { Carousel } from 'bootstrap';

const Carouselfeed = () => {
    useEffect(() => {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            new Carousel(carousel, {
                interval: 4000,
                ride: "carousel"
            });
        });
    }, []);

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12 w-75 d-flex justify-content-center">
                    <div className="d-flex justify-content-center">
                        <div id='carousel1' className='carousel slide w-50'>
                            <div className='carousel-inner w-100'>
                                <div className='carousel-item active'>
                                    <img src='/aspects/banner2.jpg'  alt='...'  width='100%' />
                                </div>
                                <div className='carousel-item'>
                                    <img src='/aspects/banner3.jpg' alt='...'   width='100%'/>
                                </div>
                                <div className='carousel-item'>
                                    <img src='/aspects/banner4.jpg'  alt='...'  width='100%'/>
                                </div>
                            </div>
                        </div>
                        <div id='carousel2' className='carousel slide w-50'>
                            <div className='carousel-inner w-100'>
                                <div className='carousel-item active'>
                                    <img src='/aspects/banner3.jpg'  alt='...'  width='100%' />
                                </div>
                                <div className='carousel-item'>
                                    <img src='/aspects/banner4.jpg'  alt='...'  width='100%' />
                                </div>
                                <div className='carousel-item'>
                                    <img src='/aspects/banner2.jpg'  alt='...'  width='100%'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carouselfeed;
