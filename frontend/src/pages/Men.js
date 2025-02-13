import React from 'react'
import Navbar from '../component/Navbar'
import Menfeed from '../component/Menfeed'
import Allfeed from '../component/Allfeed'
import Carouselfeed from '../carousel/Carouselfeed'
function Men() {
  return (
    <>
        <Navbar/>
        <Allfeed/>
        <Menfeed/>
        <Carouselfeed/>
    </>
    
  )
}

export default Men