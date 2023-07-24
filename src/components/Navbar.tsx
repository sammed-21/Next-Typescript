import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
      <div className='flex justify-around items-center space-x-4 w-full h-[10vh] bg-slate-400 align-center'>
         
          <div className='space-x-4 justify-center flex'>
              
                  <Link href="/">
                      Home
                  </Link>
                  <Link href="/login">
                      About us
                  </Link>
                  <Link href="/login">
                      Contact Us
          </Link>
               </div>
          <div className='space-x-3 '>
              
                  <Link href="/login">
                      Login
                  </Link>
                  <Link href="/signup">
                      SignUp
                  </Link>
          </div>
              
           
    </div>
  )
}

export default Navbar