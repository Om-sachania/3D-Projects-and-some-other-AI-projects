import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils'
import { navLists } from '../constants'

const Navbar = () => {
  return (
    <header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
        <nav className='flex w-full screen-max-width'>
            <img src={appleImg} alt="Apple" width={14} height={18} />
            <div className='flex flex-1 justify-center max-sm:hidden gap-12'>
                {navLists.map((navItem)=>(
                    <div key={navItem} className='text-gray-400 text-sm cursor-pointer hover:text-white transition-all'>{navItem}</div>
                ))}
            </div>
            <div className='flex gap-7 items-baseline max-sm:justify-end max-sm:flex-1'>
                <img src={searchImg} alt="Search" height={18} width={18}/>
                <img src={bagImg} alt="Bag" height={18} width={18}/>
            </div>
        </nav>
    </header>
  )
}

export default Navbar