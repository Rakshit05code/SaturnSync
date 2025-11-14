import { motion } from 'framer-motion'

export default function AnimatedCard({ children, index = 0, className = '', delay = 0 }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: (index * 0.1) + delay, duration: 0.5, type: 'spring', stiffness: 100 },
    },
    hover: {
      y: -5,
      boxShadow: 'var(--soft-shadow)',
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`bg-glass border border-accent/30 rounded-xl backdrop-blur p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}
