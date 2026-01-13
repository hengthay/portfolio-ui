import React, { useState } from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'

const MainLayout = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='w-full min-h-screen h-auto bg-black'>
      <div className='max-w-7xl container mx-auto flex flex-col text-white bg-zinc-950 shadow-xl'>
        <Header isOpen={isOpen} handleOpenMenu={handleOpenMenu}/> 
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout