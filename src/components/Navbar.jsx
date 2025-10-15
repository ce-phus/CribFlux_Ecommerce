import React, { useState } from 'react'
import { logo } from '../assets'

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleNavigation = () => {
    setOpen(!open);
  }
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-5xl z-50">
      <nav className="flex justify-between items-center px-5 py- backdrop-blur-lg bg-white/20 border border-white/10 shadow-lg rounded-2xl">
        <img
        src={logo}
        alt='logo'
        className='w-20 h-20'
        />
        <div className="flex space-x-4 text-white/80">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
