import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeaturedProducts } from '../actions/productsActions';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { tanks, tees } from '../assets';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import { Link, useNavigate } from 'react-router-dom';
import Products from './Products';
import { getCategoryDetail } from '../actions/productsActions';

const Featured = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageErrors, setImageErrors] = useState({});

    useEffect(() => {
        dispatch(getFeaturedProducts());
    }, [dispatch]);

    const { featuredProducts, error, loading, featuredCategories, popularProducts, recentlyViewedProducts } = useSelector((state) => state.featuredProductsReducers);
    const { category } = useSelector(state => state.categoryDetailReducer);

    const API_URL = import.meta.env.VITE_API_URL;

    const handleImageError = (imageUrl) => {
        console.log('Image failed to load:', imageUrl);
        setImageErrors(prev => ({ ...prev, [imageUrl]: true }));
    };

    const getImageUrl = (path) => {
        if (!path) return null;
        // Remove leading slash if present to avoid double slashes
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${API_URL}/${cleanPath}`;
    };

    const handleProductDetailRoute = (product) => {
        navigate(`/product/${product.slug}`);
    }

    const getFallbackIcon = (categoryTitle, type = 'category') => {
        if (type === 'category') {
            return categoryTitle?.toLowerCase().includes('tank') ? (
                <div>
                    <img 
                    src={tanks}
                    />
                </div>
            ) : <div>
            <img 
            src={tees}
            />
        </div>;
        }
        return <div>

            <img
            src={categoryTitle?.toLowerCase().includes('tank') ? tanks : tees}
            />
        </div>;
    };

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    // Skeleton components
    const ProductSkeleton = () => (
        <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-800">
            <Skeleton height={200} className="mb-3 rounded-lg" />
            <Skeleton height={20} width="60%" className="mb-2" />
            <Skeleton height={16} width="40%" />
        </div>
    );

    const CategorySkeleton = () => (
        <div className="bg-gray-900/40 rounded-lg p-6 border border-gray-800">
            <Skeleton height={100} className="mb-3 rounded-lg" />
            <Skeleton height={20} width="70%" className="mx-auto" />
        </div>
    );

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-violet-400 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl mb-2">Failed to load products</h2>
                    <p className="text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                
                {/* Animated Glow */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-600/10 blur-3xl"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        backgroundSize: "200% 200%",
                    }}
                />
            </div>

            <div className="relative z-10">
                {/* Categories Section */}
                <motion.section 
                    className="mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <div className="inline-block bg-gray-900/60 text-sm text-gray-200 px-4 py-1 rounded-full mb-4 border border-gray-800">
                            Collections
                        </div>
                        <h2 className="text-3xl md:text-4xl font-light mb-4">
                            Explore Our <span className="text-violet-400">Categories</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Discover our premium collection of tanks and tees designed for performance and style
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                    >
                        {loading ? (
                            Array(2).fill(0).map((_, index) => (
                                <CategorySkeleton key={index} />
                            ))
                        ) : (
                            featuredCategories?.map((category) => {
                                const imageUrl = getImageUrl(category.image);
                                const hasError = imageErrors[imageUrl];
                                
                                return (
                                    <motion.div
                                        key={category.id}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative bg-gray-900/40 mx-10 lg:mx-0 rounded-xl p-6 border border-gray-800 hover:border-violet-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
                                    >
                                        <Link
                                        to={`category/${category.slug}`}>
                                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="relative z-10 text-center">
                                                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-violet-500/30 group-hover:border-violet-500/60 transition-colors duration-300 bg-gradient-to-br from-violet-500/20 to-purple-600/20">
                                                    {imageUrl && !hasError ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={category.title}
                                                            className="w-full h-full object-cover"
                                                            onError={() => handleImageError(imageUrl)}
                                                            crossOrigin="anonymous"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <span className="text-3xl">
                                                                {getFallbackIcon(category.title, 'category')}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                                                    {category.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm">Explore Collection</p>
                                            </div>
                                        </Link> 
                                    </motion.div>
                                );
                            })
                        )}
                    </motion.div>
                </motion.section>


                <div>
                    <Section1 />
                </div>

                {/* Popular Products */}
                <motion.section 
                    className="mb-20 container mx-auto px-4 py-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <div className="inline-block bg-gray-900/60 text-sm text-gray-200 px-4 py-1 rounded-full mb-4 border border-gray-800">
                            Trending Now
                        </div>
                        <h2 className="text-3xl md:text-4xl font-light mb-4">
                            <span className="text-violet-400">Popular</span> This Week
                        </h2>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {loading ? (
                            Array(4).fill(0).map((_, index) => (
                                <ProductSkeleton key={index} />
                            ))
                        ) : (
                            popularProducts?.map((product) => {
                                const imageUrl = getImageUrl(product.image);
                                const hasError = imageErrors[imageUrl];
                                
                                return (
                                    <motion.button
                                        key={product.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}
                                        onClick={() => handleProductDetailRoute(product)}
                                        className="group bg-gray-900/40 rounded-xl p-4 border border-gray-800 hover:border-violet-500/50 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="relative overflow-hidden rounded-lg mb-4">
                                            {imageUrl && !hasError ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={product.title}
                                                    className="w-full h-48 object-cover"
                                                    onError={() => handleImageError(imageUrl)}
                                                    crossOrigin="anonymous"
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                                                    <span className="text-4xl">
                                                        {getFallbackIcon(product.category?.title, 'product')}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-light hover:bg-white/30 transition-colors">
                                                    Quick View
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2 group-hover:text-violet-300 transition-colors">
                                            {product.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-violet-400 font-semibold">Ksh.{product.price}</span>
                                            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                                                {product.category?.title}
                                            </span>
                                        </div>
                                    </motion.button>
                                );
                            })
                        )}
                    </motion.div>
                </motion.section>

                <div>
                    <Section2 />
                </div>

                {/* All Products */}
                <motion.section 
                    className="mb-20 container mx-auto px-4 py-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <div className="inline-block bg-gray-900/60 text-sm text-gray-200 px-4 py-1 rounded-full mb-4 border border-gray-800">
                            Full Collection
                        </div>
                        <h2 className="text-3xl md:text-4xl font-light mb-4">
                            All <span className="text-violet-400">Products</span>
                        </h2>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                    >
                        {loading ? (
                            Array(5).fill(0).map((_, index) => (
                                <ProductSkeleton key={index} />
                            ))
                        ) : (
                            featuredProducts?.map((product) => {
                                const imageUrl = getImageUrl(product.image);
                                const hasError = imageErrors[imageUrl];
                                
                                return (
                                    <motion.button
                                        key={product.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}

                                        className="group bg-gray-900/40 rounded-xl p-4 border border-gray-800 hover:border-violet-500/50 transition-all duration-300 cursor-pointer"
                                    >
                                        
                                        <div className="relative overflow-hidden rounded-lg mb-4">
                                            {imageUrl && !hasError ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={product.title}
                                                    className="w-full h-40 object-cover"
                                                    onError={() => handleImageError(imageUrl)}
                                                    crossOrigin="anonymous"
                                                />
                                            ) : (
                                                <div className="w-full h-40 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                                                    <span className="text-3xl">
                                                        {getFallbackIcon(product.category?.title, 'product')}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-light hover:bg-white/30 transition-colors">
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                                            {product.title}
                                        </h3>
                                        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-violet-400 font-semibold">Ksh.{product.price}</span>
                                            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                                                {product.category?.title}
                                            </span>
                                        </div>
                                    </motion.button>
                                );
                            })
                        )}
                    </motion.div>
                </motion.section>

                <div className=''>
                    <Section3 />
                </div>

                {/* Recently Viewed */}
                {recentlyViewedProducts?.length > 0 && (
                    <motion.section 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className='container mx-auto px-4 py-16'
                    >
                        <motion.div variants={itemVariants} className="text-center mb-12 mt-5">
                            <div className="inline-block bg-gray-900/60 text-sm text-gray-200 px-4 py-1 rounded-full mb-4 border border-gray-800">
                                Your History
                            </div>
                            <h2 className="text-3xl md:text-4xl font-light mb-4">
                                Recently <span className="text-violet-400">Viewed</span>
                            </h2>
                        </motion.div>

                        <motion.div 
                            variants={containerVariants}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {recentlyViewedProducts?.map((product) => {
                                const imageUrl = getImageUrl(product.image);
                                const hasError = imageErrors[imageUrl];
                                
                                return (
                                    <motion.div
                                        key={product.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}
                                        className="group bg-gray-900/40 rounded-xl p-4 border border-gray-800 hover:border-violet-500/50 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="relative overflow-hidden rounded-lg mb-4">
                                            {imageUrl && !hasError ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={product.title}
                                                    className="w-full h-40 object-cover"
                                                    onError={() => handleImageError(imageUrl)}
                                                    crossOrigin="anonymous"
                                                />
                                            ) : (
                                                <div className="w-full h-40 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                                                    <span className="text-3xl">🔍</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-light hover:bg-white/30 transition-colors">
                                                    View Again
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                                            {product.title}
                                        </h3>
                                        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-violet-400 font-semibold">Ksh.{product.price}</span>
                                            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                                                {product.category?.title}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.section>
                )}
            </div>
        </div>
    );
}

export default Featured;