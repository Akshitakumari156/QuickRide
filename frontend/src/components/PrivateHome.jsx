import React from 'react'
import MapView from './MapView'

const PrivateHome = () => {
  return (
    <div className='w-full flex h-full'>
      <div className='w-[50%]'>
        <h1 className='text-3xl font-bold text-center mt-10'>Welcome to UrbanMove</h1>
      </div>
   <div className='w-[50%] min-h-full bg-red-500'>
        <MapView/>
   </div>
    </div>
  )
}

export default PrivateHome
