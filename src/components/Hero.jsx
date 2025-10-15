import React from 'react'
import { motion } from 'framer-motion'


const randomPosition = () => ({
  top: `${Math.floor(Math.random() * 100)}%`,
  left: `${Math.floor(Math.random() * 100)}%`,
});

const Ripples = () => {
  const ripples = Array.from({ length: 5 }); // how many drops appear simultaneously

  return (
    <>
      {ripples.map((_, i) => {
        const { top, left } = randomPosition();
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full border border-violet-500/40"
            style={{ top, left }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{
              scale: [0, 1.5, 2],
              opacity: [0.8, 0.4, 0],
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 4,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        );
      })}
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-black text-center text-white overflow-hidden">
      {/* Background Grid with Subtle Energy Pulses */}
      <div className="absolute inset-0">
        {/* Static Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Single Grid Line Pulses */}
        <div className="absolute inset-0">
          {/* Horizontal Line Pulses */}
          <motion.div
            className="absolute w-full h-[1px] bg-violet-400/60 blur-[1px]"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: [0, 1, 0], x: "100%" }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeOut",
            }}
            style={{ top: "40%" }}
          />
          
          <motion.div
            className="absolute w-full h-[1px] bg-violet-400/40 blur-[1px]"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: [0, 1, 0], x: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 7,
              ease: "easeOut",
            }}
            style={{ top: "60%" }}
          />

          {/* Vertical Line Pulses */}
          <motion.div
            className="absolute h-full w-[1px] bg-violet-400/50 blur-[1px]"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: [0, 1, 0], y: "100%" }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeOut",
            }}
            style={{ left: "30%" }}
          />
          
          <motion.div
            className="absolute h-full w-[1px] bg-violet-400/30 blur-[1px]"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: [0, 1, 0], y: "100%" }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 6,
              ease: "easeOut",
            }}
            style={{ left: "70%" }}
          />
        </div>
      </div>

      {/* Animated Violet Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-transparent to-violet-700/20 blur-3xl"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-4">
        {/* Announcement Badge */}
        <div className="inline-block bg-gray-900/60 text-sm text-gray-200 px-4 py-1 rounded-full mb-6 border border-gray-800">
          Exciting announcement 🎉
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          A landing page template
          <br />
          <span className="text-violet-400">that works for you</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Build beautiful landing pages for your startups, clients, and side
          projects — without having to think about design.
        </p>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-4">
          <button className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition">
            Try it free →
          </button>
          <button className="text-gray-300 hover:text-white font-medium transition">
            Learn more
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero