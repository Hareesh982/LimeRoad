import { Link } from 'react-router-dom'

function Allfeed() {

  return (
    <>
      <div className='container mt-2'>
        <div className='row '>
          <div className='col-md-5 d-flex justify-content-center'>
            <div className='d-flex gap-5'>
                <Link  style={{textDecoration:'none',fontSize:'13px',color:'black'}} to='/'><p>WOMEN</p></Link>
                <Link style={{textDecoration:'none',fontSize:'13px',color:'black'}} to='/men'><p>MEN</p></Link>
                <Link style={{textDecoration:'none',fontSize:'13px',color:'black'}} to='/kids'><p>KIDS</p></Link>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Allfeed