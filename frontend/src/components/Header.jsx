import React from 'react'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
        <div className='max-w-[100%] rounded-b-sm min-h-16 md: h-20 flex justify-between bg-[#0F2C46] px-8 items-center'>
            <div className='flex items-center m-12'>
                <img src="/logo.png" alt="" />
                <p className='text-[45px] text-[#F2F4F5]'>
                   UrbanMove
                </p>
            </div>
                <nav className='flex items-center gap-4 mr-auto'>
                <Link to={'/Pricing'}>
                   <Button label='Pricing' hoverbg="#1A3B5D" hovertextcolor="#FFFFFF"/>
                 </Link>
                  <Link to={'/Safety'}>
                   <Button label='Safety' hoverbg="#1A3B5D" hovertextcolor="#FFFFFF"/>
                 </Link>
                  <Link to={'/home'}>
                   <Button label='Service' hoverbg="#1A3B5D" hovertextcolor="#FFFFFF"/>
                 </Link>
                  <Link to={'/Support'}>
                   <Button label='Support' hoverbg="#1A3B5D" hovertextcolor="#FFFFFF"/>
                 </Link>
    
            </nav>
            <div className='flex items-center'>
                 <Button label='Login' hoverbg="#5A6672" bg='#6C7A89' textColor='#F2F4F5' className='ml-2 rounded-[55px]'/>
                <Button label='Register' bg='#6C7A89'  hoverbg="#5A6672" textColor='#F2F4F5' className='ml-2 rounded-[55px]  '/>
            </div>
        </div>
  )
}

export default Header
