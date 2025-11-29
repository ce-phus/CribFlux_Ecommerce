import React, { useState, useEffect } from 'react'
import { logo } from '../assets'
import { motion, AnimatePresence } from 'framer-motion';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { navigation } from '../constants';
import MenuSvg from "../assets/svg/MenuSvg"
import { useLocation } from 'react-router-dom';
import Login from './PopUp/Login';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../actions/profileActions';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [loginpopup, setLoginpopup] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, profile } = useSelector(state => state.getprofileReducer);
  const { userInfo } = useSelector(state => state.userLoginReducer);
  console.log("Profile: ", profile)

  console.log("UserInfo:", userInfo);

  useEffect(() => {
    if (userInfo && userInfo.access) {
      dispatch(getProfile());
    }
  }, [dispatch, userInfo, userInfo.access]);

  const handleLoginPopup = () => {
    setLoginpopup(!loginpopup);
  }

  const toggleNavigation = () => {
    if (open) {
      enablePageScroll();
    } else {
      disablePageScroll();
    }
    setOpen(!open);
  }

  const handleClick = () => {
    if (!open) return;
    enablePageScroll();
    setOpen(false);
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const navVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const backgroundVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 0.9,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={`fixed top-0 left-0 w-full z-50 text-black border-b border-transparent lg:backdrop-blur-sm ${
        open ? 'bg-black/90' : "bg-transparent backdrop-blur-sm"
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className='flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-3'>
        
        {/* Desktop Navigation - Left */}
        <nav className="hidden lg:flex">
          <div className='flex items-center'>
            {navigation.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-sm uppercase text-white/70 transition-colors hover:text-white/30 ${
                  item.onlyMobile ? 'lg:hidden' : ''
                } px-4 py-6 lg:py-8 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash ? 'z-2 text-n-1 font-bold' : 'text-n-1/70'
                } lg:leading-5 lg:hover:text-n-1 xl:px-6`}
                whileHover={{ 
                  scale: 1.05,
                  y: -1
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                {item.title}
                {item.url === pathname.hash && (
                  <motion.div 
                    className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-n-1 -translate-x-1/2 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>
        </nav>

        {/* Logo - Center */}
        <motion.a 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-[3rem] lg:w-[12rem]" 
          href="#hero"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <motion.img 
            src={logo} 
            alt="logo" 
            className="w-full h-auto"
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          />
        </motion.a>

       {userInfo && profile ? (
        <div className='hidden lg:flex items-center space-x-4 ml-auto lg:ml-0'>
          <motion.a
            href="#profile"
            className='hidden lg:flex px-6 cursor-pointer py-2.5 text-white text-sm font-light uppercase bg-black border border-n-6 rounded-full backdrop-blur-sm transition-all hover:bg-n-7 hover:border-n-5 text-white'
            whileHover={{ 
              scale: 1.05,
              y: -1,
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {profile.first_name}
          </motion.a>
        </div>
       ): (
        <div className='flex items-center space-x-4 ml-auto lg:ml-0'>
          <motion.button
            onClick={handleLoginPopup}
            className='hidden lg:flex px-6 cursor-pointer py-2.5 text-white text-sm font-light uppercase bg-black border border-n-6 rounded-full backdrop-blur-sm transition-all hover:bg-n-7 hover:border-n-5 text-white'
            whileHover={{ 
              scale: 1.05,
              y: -1,
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Sign In
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className='lg:hidden p-3 rounded-full bg- backdrop-blur-sm'
            onClick={toggleNavigation}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "rgba(255,255,255,0.2)"
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <MenuSvg openNavigation={open}/>
          </motion.button>
        </div>
       )}
        

        {/* Mobile Navigation */}
        <AnimatePresence>
          {open && (
            <motion.nav
              key="mobile-nav"
              className="fixed top-[3rem] left-0 right-0 bottom-0 bg-black/90 lg:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={navVariants}
            >
              <motion.div 
                className='absolute inset-0 pointer-events-none'
                variants={backgroundVariants}
              >
                <div className='absolute inset-0 opacity-[.15]'>
                  <img
                    src={logo}
                    className='w-full h-full object-cover'
                    width={688}
                    height={953}
                    alt="background"
                  />
                </div>
              </motion.div>
              
              <div className='relative z-2 flex flex-col items-center justify-center h-full'>
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.url}
                    onClick={handleClick}
                    className={`block relative font-light text-2xl uppercase text-white transition-colors hover:text-n-3 ${
                      item.onlyMobile ? '' : ''
                    } px-6 py-6 md:py-8`}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      x: 10
                    }}
                    whileTap={{ scale: 0.95 }}
                    custom={index}
                  >
                    {item.title}
                    {item.url === pathname.hash && (
                      <motion.div 
                        className="absolute left-0 top-1/2 w-1 h-8 bg-n-1 -translate-y-1/2 -translate-x-4 rounded-full"
                        layoutId="mobileActiveIndicator"
                      />
                    )}
                  </motion.a>
                ))}
                
                {/* Mobile Sign In Button */}
                <motion.button
                  className='mt-8 px-8 py-3 text-n-1 text-lg font-code font-bold uppercase bg-n-7/50 border border-n-6 rounded-full backdrop-blur-sm text-white/50'
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
        {loginpopup && <Login handleLoginPopup={handleLoginPopup}  />}
            
    </motion.div>
  )
}

export default Navbar