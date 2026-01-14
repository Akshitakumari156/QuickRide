import React from 'react'
import banner from "../assets/homepagebanner.jpg"
import RideLocationForm from './RideLocationForm'
const HomeHeroSection = () => {
  return (
    <div className='w-[90%] m-auto bg-[#F2F4F5] flex flex-col md:flex-row justify-around items-start mt-1 p-4 min-h-screen'>
          <div className='w-full md:w-7/12 flex flex-col items-center justify-center mt-8'>
        <p className='text-4xl md:text-6xl m-auto text-center'>
            Ride Smart, Move Fast
        </p>
         <RideLocationForm/>
     </div>

     <div className='w-full md:w-5/12 h-auto mt-6 md:mt-0 flex items-center'>
        <img src={banner} className='w-full h-auto object-cover rounded-md'  />
     </div>

    </div>
  )
}

export default HomeHeroSection
