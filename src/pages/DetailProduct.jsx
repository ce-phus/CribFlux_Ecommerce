import React, { useEffect, useState } from 'react'
import { getProductsDetailed } from '../actions/productsActions'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Products } from '../components'
import { addToCart } from '../actions/cartActions'

const DetailProduct = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { loading, error, product, relatedProducts } = useSelector((state)=>state.productsDetailedReducer)

  const allImages = product?.images ? [product.image, ...product.images.map(img => img.image)] : [product?.image]

  const API_URL = import.meta.env.VITE_API_URL;

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId, 1)); 
};

  useEffect(() => {
      dispatch(getProductsDetailed(slug))
  }, [dispatch,slug])

  function numberWithCommas(x) {
      if (x === undefined || x === null) return "0"; 
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const renderStars = (rating) => {
      const stars = [];
      const filledStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      
      for (let i = 1; i <= 5; i++) {
          if (i <= filledStars) {
              stars.push(
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
              );
          } else if (i === filledStars + 1 && hasHalfStar) {
              stars.push(
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
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
                  <svg key={i} className="w-6 h-6 text-gray-600 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
              );
          }
      }
      return stars;
  };

  if (loading) {
      return (
          <div className="min-h-screen bg-black text-white">
              <div className="max-w-7xl mx-auto py-20 px-4">
                  <div className="animate-pulse">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="bg-gray-800/40 rounded-xl h-96"></div>
                          <div className="space-y-4">
                              <div className="h-8 bg-gray-800/40 rounded w-3/4"></div>
                              <div className="h-6 bg-gray-800/40 rounded w-1/2"></div>
                              <div className="h-4 bg-gray-800/40 rounded w-full"></div>
                              <div className="h-4 bg-gray-800/40 rounded w-full"></div>
                              <div className="h-12 bg-gray-800/40 rounded w-32"></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }   

  if (error) {
      return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
              <div className="text-center p-8 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 max-w-md">
                  <div className="text-6xl mb-4">😞</div>
                  <h2 className="text-2xl font-bold mb-2 text-white">Product Not Found</h2>
                  <p className="text-gray-400 mb-6">We couldn't load the product details. Please try again.</p>
                  <button 
                      onClick={() => window.history.back()}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                      Go Back
                  </button>
              </div>
          </div>
      );
  }

  return (
      <div className="min-h-screen bg-black text-white">
          <div className="max-w-7xl mx-auto py-8 px-4 pt-20">
              {/* Breadcrumb */}
              <nav className="flex mb-8" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2 text-sm text-gray-400">
                      <li><a href="/" className="hover:text-indigo-400 transition-colors">Home</a></li>
                      <li className="flex items-center">
                          <span className="mx-2">/</span>
                          <a href={`/product/${slug}`} className="hover:text-indigo-400 transition-colors capitalize">
                              {slug?.replace('-', ' ')}
                          </a>
                      </li>
                      
                  </ol>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                      <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                          <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-800/50">
                              {!imageLoaded && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-8 h-8 border-3 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                                  </div>
                              )}
                              <img 
                                  src={API_URL + allImages[selectedImage]}
                                  crossOrigin="anonymous" 
                                  alt={product?.title}
                                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                  onLoad={() => setImageLoaded(true)}
                              />
                          </div>
                          
                          {/* Thumbnail Gallery */}
                          {allImages.length > 1 && (
                              <div className="flex space-x-3 mt-4 overflow-x-auto py-2">
                                  {allImages.map((img, index) => (
                                      <button
                                          key={index}
                                          onClick={() => {
                                              setSelectedImage(index)
                                              setImageLoaded(false)
                                          }}
                                          className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all duration-200 overflow-hidden ${
                                              selectedImage === index 
                                                  ? 'border-indigo-500 ring-2 ring-indigo-500/20' 
                                                  : 'border-gray-700 hover:border-indigo-400/50'
                                          }`}
                                      >
                                          <img 
                                              src={API_URL + img} 
                                              alt={`${product?.title} view ${index + 1}`}
                                              crossOrigin='anonymous'
                                              className="w-full h-full object-cover"
                                          />
                                      </button>
                                  ))}
                              </div>
                          )}
                      </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-6">
                      <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                          {/* Title and Rating */}
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                              <h1 className="text-3xl font-bold text-white mb-3 sm:mb-0 pr-4">{product?.title}</h1>
                              <div className="flex items-center space-x-2 bg-gray-800/60 px-3 py-2 rounded-full border border-gray-700">
                                  <span className="text-lg font-semibold text-yellow-400">{product?.rating}</span>
                                  <div className="flex space-x-1">
                                      {renderStars(product?.rating || 0)}
                                  </div>
                              </div>
                          </div>

                          {/* Price */}
                          <div className="mb-6">
                              <h2 className="text-4xl font-bold text-indigo-400 mb-2">
                                  KES {numberWithCommas(product?.price)}
                              </h2>
                              <div className="flex items-center space-x-3 text-sm text-gray-400">
                                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                      product?.num_available > 10 
                                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                          : product?.num_available > 0
                                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  }`}>
                                      {product?.num_available > 0 ? `${product.num_available} in stock` : 'Out of stock'}
                                  </span>
                                  <span>•</span>
                                  <span>SKU: {product?.id}</span>
                              </div>
                          </div>

                          {/* Description */}
                          <div className="mb-6">
                              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                              <p className="text-gray-300 leading-relaxed text-lg">
                                  {product?.description}
                              </p>
                          </div>

                          {/* Add to Cart */}
                          <div className="space-y-4">
                              <button
                              onClick={() => handleAddToCart(product.id)}
                                  className="w-full bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                  disabled={!product?.num_available || product?.num_available === 0}
                              >
                                  {product?.num_available > 0 ? 'Add to Cart' : 'Out of Stock'}
                              </button>
                              
                              <div className="flex space-x-3">
                                  <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 border border-gray-700">
                                      Add to Wishlist
                                  </button>
                                  <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 border border-gray-700">
                                      Share
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* Variants */}
                      {product?.variants && product.variants.length > 0 && (
                          <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                              <h2 className="text-2xl font-bold mb-6 text-white">Available Variants</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {product.variants.map((variant) => (
                                      <div key={variant.id} className="bg-gray-800/40 border border-gray-700 rounded-xl p-4 hover:border-indigo-500/50 transition-all duration-200 group">
                                          <div className="flex space-x-4">
                                              <img 
                                                  src={API_URL + variant.thumbnail} 
                                                  alt={variant.title}
                                                  crossOrigin='anonymous'
                                                  className="w-20 h-20 object-cover rounded-lg"
                                              />
                                              <div className="flex-1">
                                                  <h3 className="font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                                      {variant.title}
                                                  </h3>
                                                  <p className="text-indigo-400 font-bold text-lg mb-1">
                                                      KES {numberWithCommas(variant.price)}
                                                  </p>
                                                  <p className="text-sm text-gray-400">
                                                      Available: {variant.num_available}
                                                  </p>
                                                  <button
                                                  onClick={() => handleAddToCart(variant.id)}
                                                  className="mt-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
                                                      Add to Cart
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
              </div>

              {/* Related Products */}
              {relatedProducts && relatedProducts.length > 0 && (
                  <div className="border-t border-gray-800 pt-12">
                      <div className="text-center mb-8">
                          <h2 className="text-3xl font-bold text-white mb-2">
                              Related <span className="text-indigo-400">Products</span>
                          </h2>
                          <p className="text-gray-400 text-lg">Discover more products you might like</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {relatedProducts.map((product) => (
                              <Products key={product.id} product={product} />
                          ))}
                      </div>
                  </div>
              )}
          </div>
      </div>
  )
}

export default DetailProduct