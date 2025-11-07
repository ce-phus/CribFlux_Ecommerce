import React, { useEffect } from 'react'
import { AnimatePresence,motion } from 'framer-motion'
import { logo2, logo, logo1, logo3 } from '../../assets'
import { login } from "../../actions/userActions"
import { useDispatch } from 'react-redux'

const Login = ({ handleLoginPopup }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        window.open("/","_self");
    }

    const handleModalContentClick = (e) => {
        e.stopPropagation();
    }


  return (
    <AnimatePresence>
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'
        onClick={handleLoginPopup}
        >
            <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className='bg-[#0d0d0d] rounded-lg p-6 w-full max-w-md shadow-lg'
            onClick={handleModalContentClick}
            >
                <div className='text-center'>
                    <h2 className='text-2xl font-light mb-2 text-white'>Sign In</h2>
                    <img src={logo3} alt="Logo" className='w-20 h-20 mx-auto mb-2' />
                    <p className='text-sm text-white/50'>Sign in with myCrib</p>
                    <p className='text-white/50 font-light text-lg'></p>
                </div>

            <form onSubmit={handleSubmit} className='mt-4'>
                <label className='block text-white/70 mb-2'>
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full px-4 py-2 mb-4 bg-[#1a1a1a] border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500 text-white'
                />

                <label className='block text-white/70 mb-2'>
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='w-full px-4 py-2 mb-4 bg-[#1a1a1a] border border-white/10 rounded-xl focus:outline-none focus:border-yellow-500 text-white'
                />
            </form>
            <button
                onClick={handleSubmit}
                className='w-full bg-black/70 hover:bg-black/60 text-white font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer'
            >
                Sign In
            </button>
            <div className='text-center'>
                <a href='#' className='text-yellow-500 text-sm mt-3 inline-block'>Forgot Password?</a>
            </div>
            <div>
                <p className='text-white font-light text-sm mt-3 text-center'>Don't have an account? 
                    <a href='https://mycrib.app/register' target='_blank' className='text-yellow-500'> Sign Up</a>
                </p>
            </div>
            <div className='mt-3'>
                <p className='text-white font-light text-xs'>By Clicking to Sign In you have agree to myCrib's 
                 <a href='https://mycrib.info/terms-of-service' target='_blank' className='text-yellow-500'> Terms of Service </a>, 
                    <a href='https://mycrib.info/privacy' target='_blank' className='text-yellow-500'> Privacy Policy </a> and
                    <a href='https://mycrib.info/privacy' className='text-yellow-500'> Cookie Policy</a>.
                </p>
            </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
  )
}

export default Login