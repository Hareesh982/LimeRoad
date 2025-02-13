import React from 'react'
import { Link } from 'react-router-dom'
function Kidsfeed() {
    const women = [
        { wear: 'FROKS', path: '/aspects/kids_girl_froks.jpg' },
        { wear: 'TWIN SETS', path: '/aspects/kids_girl_twin_sets.jpg' },
        { wear: 'TWIN SETS', path: '/aspects/kids_boy_twin_sets.jpg' },
        { wear: 'T SHIRTS', path: '/aspects/kids_boy_tshirts.jpg' },
        { wear: 'SHIRTS', path: '/aspects/kids_boy_shirts.jpeg' },
        { wear: 'BOTTOM', path: '/aspects/kids_boy_bottoms.jpg' },
        { wear: 'TOPS', path: '/aspects/kids_girl_tops.jpg' },
        { wear: 'ETHNIC WEAR', path: '/aspects/kids_girl_ethnic.jpg' },
        { wear: 'BOTTOM', path: '/aspects/kids_girl_bottom.jpg' } ,
        { wear: 'WINTERWEAR', path: '/aspects/kids_winter.jpg' } ,
        { wear: 'LOUNGEWEAR', path: '/aspects/kids_girl_lounge.jpg' } ,
        { wear: 'HOME', path: '/aspects/home.jpg' } ,
        { wear: 'LOUNGEWEAR', path: '/aspects/kids_boy_lounge.jpg' }

      ]
    return (
        <div className='d-flex justify-content-center' style={{margin:"10px 200px", gap:'25px'}}>
            <Link className="d-flex flex-column align-items-center" style={{textDecoration:'none',color:'black'}}>
                <img src='/aspects/myfeed.png' alt='kurthas' height={'60px'} width={'60px'} style={{borderRadius:'50%',border:'2px solid lightgreen', padding:'2px'}}/>
                <p style={{fontSize:'10px'}}>MY FEED</p>
            </Link>
    
            {
                women.map(item => {
                return <>
                    <Link className="d-flex flex-column align-items-center" style={{textDecoration:'none',color:'black'}}>
                    <img src={item.path} alt='kurthas' height={'60px'} width={'60px'} style={{borderRadius:'50%', padding:'5px'}}/>
                    <p style={{fontSize:'10px'}}>{item.wear}</p>
                    </Link>
                </>
                }
                )
            }
      </div>
    )
}

export default Kidsfeed