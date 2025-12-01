import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Link, useNavigate } from 'react-router-dom'
import { getProfile } from '../actions/profileActions';

const API_URL = import.meta.env.VITE_API_URL;

const CartUI = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        city: '',
        country: '',
        zip_code: ''
    });

    const { cartItems, loading, error } = useSelector((state) => state.cartReducer);
    const { profile, loading: profileLoading } = useSelector((state) => state.getprofileReducer);
    const { userInfo } = useSelector((state) => state.userLoginReducer);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                email: profile.email || '',
                phone_number: profile.phone_number || '',
                address: profile.address || '',
                city: profile.city || '',
                country: profile.country || '',
                zip_code: profile.zip_code || ''
            });
        }
    }, [profile]);

    const increaseQuantity = (item) => {
        dispatch(addToCart(item.product, item.quantity + 1));
    };

    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(addToCart(item.product, item.quantity - 1));
        }
    };

    const handleRemoveItem = (item) => {
        dispatch(removeFromCart(item.product));
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.product_price * item.quantity, 0);
    };

    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    function numberWithCommas(x) {
        if (x === undefined || x === null) return "0"; 
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        // dispatch(updateProfile(formData));
        setShowProfileForm(false);
    };

    const handleCheckout = () => {
        if (!userInfo) {
            navigate('/login');
        } else {
            navigate('/shipping');
        }
    };

    if (loading || profileLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-lg">Loading your cart...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center p-8 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 max-w-md">
                    <div className="text-6xl mb-4">😞</div>
                    <h2 className="text-2xl font-bold mb-2 text-white">Cart Loading Failed</h2>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const shippingEstimate = 1500; 
    const taxRate = 0.16; // 16% tax
    const taxAmount = calculateTotalPrice() * taxRate;
    const grandTotal = calculateTotalPrice() + shippingEstimate + taxAmount;

    return (
        <div className="min-h-screen bg-black text-white pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-light text-white mb-2">
                        Your <span className="text-indigo-400">Shopping Cart</span>
                    </h1>
                    <p className="text-gray-400">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-16 bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-800">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any products to your cart yet.
                        </p>
                        <Link 
                            to="/" 
                            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                                {cartItems.map((item) => {
                                    const imageUrl = item?.image ? `${API_URL}/${item.image}` : 'https://via.placeholder.com/150';
                                    return (
                                        <div key={item?.id} className="p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800/30 transition-colors duration-200">
                                            <div className="flex items-center space-x-4">
                                                {/* Product Image */}
                                                <div className="relative">
                                                    <img
                                                        src={imageUrl}
                                                        crossOrigin="anonymous"
                                                        alt={item.product_title}
                                                        className="w-24 h-24 object-cover rounded-xl border border-gray-700"
                                                    />
                                                    {item.quantity > 1 && (
                                                        <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                                            {item.quantity}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg text-white mb-1 hover:text-indigo-300 transition-colors cursor-pointer">
                                                        {item.product_title}
                                                    </h3>
                                                    <p className="text-indigo-400 font-bold text-xl mb-3">
                                                        KES {numberWithCommas(item.product_price)}
                                                    </p>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center space-x-3">
                                                        <button
                                                            onClick={() => decreaseQuantity(item)}
                                                            className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors duration-200"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-lg font-medium w-8 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => increaseQuantity(item)}
                                                            className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors duration-200"
                                                        >
                                                            +
                                                        </button>
                                                        <span className="text-gray-400 text-sm ml-4">
                                                            KES {numberWithCommas(item.product_price * item.quantity)} total
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => handleRemoveItem(item)}
                                                    className="text-gray-400 hover:text-red-400 transition-colors duration-200 p-2"
                                                    title="Remove item"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Continue Shopping */}
                            <div className="mt-6">
                                <Link
                                    to="/"
                                    className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>

                        {/* Order Summary & Profile */}
                        <div className="space-y-6">
                            {/* Order Summary */}
                            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Subtotal ({calculateTotalQuantity()} items)</span>
                                        <span className="font-medium">KES {numberWithCommas(calculateTotalPrice())}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Shipping Estimate</span>
                                        <span className="font-medium">KES {numberWithCommas(shippingEstimate)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Tax (16%)</span>
                                        <span className="font-medium">KES {numberWithCommas(taxAmount.toFixed(0))}</span>
                                    </div>
                                    <hr className="border-gray-700" />
                                    <div className="flex justify-between text-xl font-bold text-white">
                                        <span>Grand Total</span>
                                        <span className="text-indigo-400">KES {numberWithCommas(grandTotal.toFixed(0))}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] mb-4"
                                >
                                    Proceed to Checkout
                                </button>

                                {/* Coupon Code */}
                                <div className="mt-6">
                                    <p className="text-sm text-gray-400 mb-3">Have a coupon code?</p>
                                    <div className="flex">
                                        <input
                                            placeholder="Enter coupon code"
                                            className="flex-1 py-3 px-4 border border-gray-700 rounded-l-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        />
                                        <button className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-r-lg font-medium transition-colors duration-200 border border-gray-700 border-l-0">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Section */}
                            <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white">Your Profile</h2>
                                    <button
                                        onClick={() => setShowProfileForm(!showProfileForm)}
                                        className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                                    >
                                        {showProfileForm ? 'Hide' : 'Edit'}
                                    </button>
                                </div>

                                {showProfileForm ? (
                                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    value={formData.first_name}
                                                    onChange={handleInputChange}
                                                    className="w-full py-3 px-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                    placeholder="John"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    value={formData.last_name}
                                                    onChange={handleInputChange}
                                                    className="w-full py-3 px-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                    placeholder="Doe"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full py-3 px-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone_number"
                                                value={formData.phone_number}
                                                onChange={handleInputChange}
                                                className="w-full py-3 px-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                placeholder="+254 700 000 000"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                rows="2"
                                                className="w-full py-3 px-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                placeholder="Your shipping address"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full py-3 px-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                    placeholder="Nairobi"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="w-full py-3 px-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                    placeholder="Kenya"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">ZIP Code</label>
                                                <input
                                                    type="text"
                                                    name="zip_code"
                                                    value={formData.zip_code}
                                                    onChange={handleInputChange}
                                                    className="w-full py-3 px-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                    placeholder="00100"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex space-x-3 pt-2">
                                            <button
                                                type="submit"
                                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                                            >
                                                Save Profile
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowProfileForm(false)}
                                                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 border border-gray-700"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-gray-800">
                                            <span className="text-gray-400">Name:</span>
                                            <span className="font-medium text-white">
                                                {profile?.first_name} {profile?.last_name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-800">
                                            <span className="text-gray-400">Email:</span>
                                            <span className="font-medium text-white">{profile?.email}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-800">
                                            <span className="text-gray-400">Phone:</span>
                                            <span className="font-medium text-white">
                                                {profile?.phone_number || 'Not set'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-800">
                                            <span className="text-gray-400">Address:</span>
                                            <span className="font-medium text-white text-right">
                                                {profile?.address || 'Not set'}
                                                {profile?.city && profile?.country && (
                                                    <div className="text-sm text-gray-400">
                                                        {profile.city}, {profile.country} {profile.zip_code}
                                                    </div>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartUI;