
import { Link } from 'react-router-dom'


function Menfeed() {
    const women = [
        { wear: 'T-SHIRT', path: '/aspects/men_tshirt.jpg' },
        { wear: 'SHIRTS', path: '/aspects/men_shirt.jpg' },
        { wear: 'JEANS', path: '/aspects/men_jeans.jpg' },
        { wear: 'TROUSERS', path: '/aspects/men_trousers.jpg' },
        { wear: 'ETHNIC SETS', path: '/aspects/men_ethnic.jpg' },
        { wear: 'FOOTWEAR', path: '/aspects/men_footwear.jpg' },
        { wear: 'HOME', path: '/aspects/home.jpg' },
        { wear: 'ACCESSORY', path: '/aspects/men_access.jpg' },
        { wear: 'WINTER', path: '/aspects/men_winter.jpg' }
      ]
    return (
        <>
            <div className="container my-3">
                <div className="row justify-content-center align-items-center g-3">
                    <div className="col-auto">
                        <Link to="/" className="d-flex flex-column align-items-center text-decoration-none text-dark">
                            <img src="/aspects/myfeed.png" alt="kurthas" height="80" width="80" 
                                style={{ borderRadius: '50%', border: '2px solid lightgreen', padding: '5px' }} 
                            />
                            <p className="small" style={{fontSize:'10px'}}>MY FEED</p>
                        </Link>
                    </div>

                    {women.map((item, index) => (
                        <div key={index} className="col-auto">
                            <Link to="/" className="d-flex flex-column align-items-center text-decoration-none text-dark">
                                <img src={item.path} alt="kurthas" height="65px" width="65px" 
                                    style={{ borderRadius: '50%', padding: '5px' }} 
                                />
                                <p className="small" style={{fontSize:'10px'}}>{item.wear}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
        
    )
}

export default Menfeed