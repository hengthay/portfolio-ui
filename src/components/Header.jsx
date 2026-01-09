import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {

  const menu = [
    {id: 1, name: 'Home', path: '/'},
    {id: 2, name: 'About', path: '/about'},
    {id: 3, name: 'Portfolios', path: '/portfolio'},
    {id: 4, name: 'Blogs', path: '/blog'},
    {id: 5, name: 'Contact', path: '/contact'},
  ]

  const location = useLocation();
  
  return (
    <div className='container w-full flex justify-center items-center mx-auto'>
      <div className='w-full flex justify-center items-center'>
        <ul className='min-w-100 rounded-2xl mt-10 flex justify-center items-center gap-x-3 py-2 bg-slate-800'>
          {
            menu.map((item) => (
              <li key={item.id} className={`p-1 text-base font-medium hover:text-cyan-600 transition-all ease-in-out duration-300 ${location.pathname === item.path ? 'text-cyan-500' : 'text-slate-400'}`}>
                <Link to={item.path}>
                  {item.name}
                </Link>
              </li>
                  
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Header