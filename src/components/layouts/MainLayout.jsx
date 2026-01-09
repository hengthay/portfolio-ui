import React from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'

const MainLayout = () => {
  return (
    <div className='w-full h-screen bg-black'>
      <div className='max-w-7xl container mx-auto flex flex-col text-white bg-zinc-950 shadow-xl'>
        <Header /> 
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout