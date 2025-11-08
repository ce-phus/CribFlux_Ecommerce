import React from 'react'
import { tanks, tees, section, tank1, tank5 } from '../assets'

const Section1 = () => {
    const images = [tanks, tank1, tank5];
    
    return (
        <div className='bg-black relative min-h-screen'>
            {/* Section image container with relative positioning */}
            <div className='relative w-full h-full'>
                <img
                    src={section}
                    className='w-full h-full object-cover'
                    alt="Section background"
                />
                
                {/* Grid container positioned absolutely relative to the section image */}
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
        </div>
    )
}

export default Section1