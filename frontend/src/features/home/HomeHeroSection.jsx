import React from 'react'
import banner from "../../assets/homepagebanner.jpg"
import RideLocationForm from '../ride/RideLocationForm'

const HomeHeroSection = () => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-12 min-h-[85vh]'>
      <div className='w-full md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left'>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Next-Gen Urban Mobility
        </div>

        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight mb-4'>
          Ride Smart, <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">Move Fast.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 font-medium mb-8 max-w-lg">
          Zero surge pricing, vetted certified captains, and instant doorstep pickup in under 3 minutes.
        </p>

        <div className="w-full">
          <RideLocationForm/>
        </div>
      </div>

      <div className='w-full md:w-5/12 relative'>
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl pointer-events-none" />
        <img 
          src={banner} 
          alt="QuickRide Mobility Fleet" 
          className='w-full h-auto object-cover rounded-3xl border border-white/10 shadow-2xl relative z-10'  
        />
      </div>
    </div>
  )
}

export default HomeHeroSection
