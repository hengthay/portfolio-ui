import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Project from './pages/Project'
import Education from './pages/Education'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Header from './components/Header'
import Footer from './components/Footer'
import MainLayout from './components/layouts/MainLayout'
import PortfolioDetail from './components/Portfolio/PortfolioDetail'

const App = () => {
  return (
    <>
      <Routes>
          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} index/>
            <Route path='/about' element={<About />} />
            <Route path='/portfolio' element={<Project />} />
            <Route path='/portfolio/:id' element={<PortfolioDetail />} />
            <Route path='/resume' element={<Education />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/contact' element={<Contact />} />
          </Route>   
      </Routes>
    </>
  )
}

export default App