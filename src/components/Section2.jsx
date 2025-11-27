import React from 'react'
import { bg, tees } from '../assets'

const Section2 = () => {
  return (
    <div className='bg-black relative min-h-screen'>
        {/* Section image container with relative positioning */}
        <div className='relative w-full h-full'>
            <img
                src={bg}
                className='w-full h-full object-cover'
                alt="Section background"
            />
            
            {/* Content container positioned absolutely relative to the section image */}
            <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4'>
             
                <img
              src={tees}
              className='rounded-lg w-1/3 object-cover mb-8'
              />
                <button
                    className='bg-white text-black px-6 py-3 mt-5 rounded-md hover:bg-gray-200 transition duration-300'
                >
                    <span className='text-lg font-medium'>Explore Now</span>
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default Section2