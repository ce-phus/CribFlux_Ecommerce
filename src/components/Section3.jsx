import React from 'react'
import { bg, bg1, tees, tank1, tank5, tanks, tank10, tees5, tank6 } from '../assets'

const images = [tees5, tank10, tank6];

const Section3 = () => {
  return (
    <div className='relative bg-black'>
        <div className='relative w-full'>
            <img
            src={bg1}
            className='w-full h-full object-cover'
            />
        </div>
        <div className='absolute inset-0 container mx-auto px-4 py-16 mt-5'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-full'>
            {images.map((img, index) => (
              <div
                  key={index}
                  className='overflow-hidden  shadow-lg'
              >
                  <img
                      src={img}
                      alt={`Gallery Image ${index + 1}`}
                      className='w-full h-[800px] object-cover'
                  />
              </div>
            ))}
          </div>
          <div className='absolute bottom-20'>
              <p className='text-xl uppercase'>cribFlux most Iconic Designs</p>
              <button
              className='bg-white mt-2 px-4 py-2'>
                  <span className='text-lg font-light text-black'>Piga Zido</span>
              </button>
          </div>
        </div>
    </div>
  )
}

export default Section3