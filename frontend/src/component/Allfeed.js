import React from 'react'
import { Link } from 'react-router-dom'

function Allfeed() {
  return (
    <div className='d-flex' style={{margin:'10px 300px',gap:'50px'}}>
        <Link style={{textDecoration:'none',fontSize:'13px',color:'black'}} to='/'><p>WOMEN</p></Link>
        <Link style={{textDecoration:'none',fontSize:'13px',color:'black'}} to='/men'><p>MEN</p></Link>
        <Link style={{textDecoration:'none',fontSize:'13px',color:'black'}} to='/kids'><p>KIDS</p></Link>
    </div>
  )
}

export default Allfeed