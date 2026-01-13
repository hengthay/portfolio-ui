import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";

const Header = ({ isOpen, handleOpenMenu}) => {

  const menu = [
    {id: 1, name: 'Home', path: '/'},
    {id: 2, name: 'About', path: '/about'},
    {id: 3, name: 'Portfolios', path: '/portfolio'},
    {id: 4, name: 'Resume', path: '/resume'},
    {id: 5, name: 'Blogs', path: '/blog'},
    {id: 6, name: 'Contact', path: '/contact'},
  ]

  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);  

  useEffect(() => {
    let t;
    if (isOpen) {
      setIsVisible(true);
    } else {
      // wait for transition to finish then unmount
      t = setTimeout(() => setIsVisible(false), 220);
    }
    return () => clearTimeout(t);
  }, [isOpen]);

  const showMobile = isOpen || isVisible;

  return (
    <header className='w-full flex justify-center items-center mx-auto'>
      <div className='w-125 fixed top-4 justify-center items-center z-50'>

        {/* Desktop menu */}
        <ul className='min-w-full rounded-2xl md:flex hidden justify-center items-center gap-x-3 py-2 bg-slate-800'>
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

        {/* Mobile mode */}
        <div className='md:hidden ml-auto flex justify-end'>
          <button onClick={handleOpenMenu} className='cursor-pointer'>
            <RiArrowDropDownLine size={28} className='text-white'/>
          </button>
        </div>

        {/* Mobile menu */}
        {showMobile && (
          <div
            className={`
              md:hidden fixed inset-0 z-40
              transition-opacity duration-200
              ${isOpen ? "opacity-100" : "opacity-0"}
            `}
            onClick={handleOpenMenu} // click outside closes
          >
            {/* dark backdrop */}
            <div className="absolute inset-0 bg-black/60" />
            <div
              className={`
                absolute top-4 left-4 right-4
                bg-slate-800 rounded-2xl p-5 space-y-3
                transition-all duration-200
                ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"}
              `}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              {/* close button */}
              <button
                onClick={handleOpenMenu}
                className="absolute top-3 right-3 text-white cursor-pointer"
                aria-label="Close menu"
              >
                <MdOutlineCancel size={28} />
              </button>

              {menu.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={handleOpenMenu}
                  className={`block p-2 text-base font-medium transition-all duration-200 hover:text-cyan-400 ${
                    location.pathname === item.path ? "text-cyan-500" : "text-slate-300"
                  }`}
                >
                  {item.name}
                  <hr className='mt-1 text-gray-500'/>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header