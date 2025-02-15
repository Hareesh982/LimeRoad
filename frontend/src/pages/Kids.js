import React from 'react'
import Navbar from '../component/Navbar'
import Allfeed from '../component/Allfeed'
import Carouselfeed from '../carousel/Carouselfeed'
import Kidsfeed from '../component/Kidsfeed'



function Kids() {
  return (
    <>
        <Navbar/>
        <Allfeed/>
        <Kidsfeed/>
        <Carouselfeed/>
    </>
    
  )
}

export default Kids