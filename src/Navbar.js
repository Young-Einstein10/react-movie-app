import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <a href="/">Movie App</a>
      </div>
      <div className='nav-item'>
        <a href="/">Home</a>
        <a href="/trending">Trending</a>
        <a href="/discover">Discover</a>
      </div>
    </nav>
  )
}

export default Navbar
