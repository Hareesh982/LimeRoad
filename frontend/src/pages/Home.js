import React from 'react'

import Navbar from '../component/Navbar'
import Womenfeed from '../component/Womenfeed';
import Allfeed from '../component/Allfeed';

import Mainbanner from '../component/Mainbanner';
import Carouselfeed from '../carousel/Carouselfeed';




function Home() {
  
  return (
    <>
      <Navbar/>
      <Allfeed/>
      <Womenfeed/>
      <Carouselfeed/>
      <Mainbanner/>
    </>
  );
}

export default Home