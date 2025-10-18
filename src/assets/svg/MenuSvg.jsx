import { motion } from 'framer-motion';

const MenuSvg = ({ openNavigation }) => {
  const topRectVariants = {
    closed: { 
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    open: { 
      y: 5,
      rotate: 45,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const bottomRectVariants = {
    closed: { 
      y: 10,
      rotate: 0,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    open: { 
      y: 5,
      rotate: -45,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  return (
    <motion.svg
      className="overflow-visible"
      width="20"
      height="12"
      viewBox="0 0 20 12"
      initial={false}
      animate={openNavigation ? "open" : "closed"}
    >
      <motion.rect
        variants={topRectVariants}
        width="20"
        height="2"
        rx="1"
        fill="white"
      />
      <motion.rect
        variants={bottomRectVariants}
        width="20"
        height="2"
        rx="1"
        fill="white"
      />
    </motion.svg>
  );
};

export default MenuSvg;