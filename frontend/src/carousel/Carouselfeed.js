import { useEffect } from "react";
import { Carousel } from 'bootstrap';

const Carouselfeed = () => {
    useEffect(() => {
        setTimeout(() => {
            document.querySelectorAll('.carousel').forEach(carousel => {
                new Carousel(carousel, {
                    interval: 4000,
                    ride: "carousel"
                });
            });
        }, 500);
    }, []);

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ width: '63%', marginLeft: '280px',gap:'1px'}}>
            <div id='carousel1' className='carousel slide' style={{ width: '50%' }}>
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <img src='/aspects/banner2.jpg' className="d-block w-100" alt='...' height='175px' />
                    </div>
                    <div className='carousel-item'>
                        <img src='/aspects/banner3.jpg' className="d-block w-100" alt='...' height='175px' />
                    </div>
                    <div className='carousel-item'>
                        <img src='/aspects/banner4.jpg' className="d-block w-100" alt='...' height='175px' />
                    </div>
                </div>
            </div>

            <div id='carousel2' className='carousel slide' style={{ width: '50%' }}>
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <img src='/aspects/banner3.jpg' className="d-block w-100" alt='...' height='175px' />
                    </div>
                    <div className='carousel-item'>
                        <img src='/aspects/banner4.jpg' className="d-block w-100" alt='...' height='175px' />
                    </div>
                    <div className='carousel-item'>
                        <img src='/aspects/banner2.jpg' className="d-block w-100" alt='...' height='175px' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carouselfeed;
