import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaOpencart } from "react-icons/fa";
import { fetchCart } from '../actions/cartActions';

const Cart = () => {
    const { cartItems } = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchCart());
    }, []);
    
  return (
    <Link to={'/cart'}>
        <div className='mx-3 relative'>
            <FaOpencart className='text-white text-4xl' />
            {Array.isArray(cartItems) && cartItems.length > 0 && (
        <span className='absolute -top-2 -right-2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full'>
          {cartItems.length}
        </span>
      )}
        </div>
    </Link>
  )
}

export default Cart