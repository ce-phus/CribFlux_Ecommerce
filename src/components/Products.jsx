import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Products = ({ product }) => {
    const { category } = useSelector(state => state.categoryDetailReducer);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const API_URL = import.meta.env.VITE_API_URL;
    const fullImageUrl = API_URL + product.thumbnail;

    // Calculate rating percentage for stars (assuming 5-star system)
    const rating = product?.rating || 5.0;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= filledStars) {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                );
            } else if (i === filledStars + 1 && hasHalfStar) {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                        <defs>
                            <linearGradient id="half-star">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="#6B7280" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#half-star)" d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-gray-600 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <div className='group mx-3 md:mx-0 mt-10 w-full'>
            <Link 
                to={`/product/${category?.slug}/${product.slug}`}
                className='flex flex-col items-center bg-gray-900/60 backdrop-blur-sm border border-gray-800 hover:border-indigo-500/70 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/20 hover:scale-[1.02]'
            >
                {/* Image Container with Loading State */}
                <div className='relative w-full h-48 bg-gray-800/50 flex items-center justify-center overflow-hidden'>
                    {!imageLoaded && !imageError && (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='w-8 h-8 border-3 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin'></div>
                        </div>
                    )}
                    {imageError ? (
                        <div className='flex flex-col items-center justify-center text-gray-500'>
                            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className='text-sm'>Image not available</span>
                        </div>
                    ) : (
                        <img 
                            src={fullImageUrl} 
                            className={`w-1/2 object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            alt={product.title} 
                            crossOrigin='anonymous'
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                        />
                    )}
                    
                    {/* Hover Overlay */}
                    <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <span className='bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                            View Details
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className='p-5 w-full flex-1 flex flex-col justify-between'>
                    <div className='text-center mb-3'>
                        <h3 className='text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors duration-200'>
                            {product.title}
                        </h3>
                        
                        {/* Rating */}
                        <div className='flex items-center justify-center space-x-1 rtl:space-x-reverse mb-2'>
                            {renderStars()}
                            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-full ms-2 border border-indigo-500/30">
                                {rating.toFixed(1)}
                            </span>
                        </div>

                        {/* Category Badge */}
                        {category && (
                            <span className='inline-block bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full border border-gray-700'>
                                {category.title}
                            </span>
                        )}
                    </div>
                    
                    {/* Price */}
                    <div className='flex items-center justify-center mt-2'>
                        <p className='text-indigo-400 text-xl font-bold uppercase tracking-wide'>
                            KES {numberWithCommas(product.price)}
                        </p>
                    </div>

                    {/* Stock Status */}
                    {product.stock !== undefined && (
                        <div className='mt-3 text-center'>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                                product.stock > 10 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                    : product.stock > 0 
                                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                            </span>
                        </div>
                    )}
                </div>
            </Link>
        </div>
  )
}

export default Products