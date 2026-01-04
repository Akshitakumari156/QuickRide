import React from 'react'
import banner from "../assets/homepagebanner.jpg"
import RideLocationForm from './RideLocationForm'
const HomeHeroSection = () => {
  return (
    <div className='w-full bg-[#F2F4F5]  flex justify-around items-start mt-1   p-4 h-screen'>
          <div className='w-[70%] flex flex-col  items-center justify-center mt-8'>
        <p className='text-6xl   m-auto'>
            Ride Smart, Move Fast
        </p>
         <RideLocationForm/>
     </div>
    
     <div className='w-[30%] h-[90%]'>
        <img src={banner}className='w-full h-full object-cover'  />
     </div>
   
    </div>
  )
}

export default HomeHeroSection
