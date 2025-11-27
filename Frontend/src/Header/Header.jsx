import React from 'react'
import Logo from '../assets/logo.png'

export const Header = () => {
  return (
    <>
      <header className="w-full md:h-20 h-15 flex items-center border-b-1 border-blue-600"> 
        <nav className=' w-full flex justify-start items-center'>
          <div className=''><img src={Logo} alt="PERO" className='h-26 w-auto mr-4' /></div>

        </nav>
      </header>

    </>
  )
}
