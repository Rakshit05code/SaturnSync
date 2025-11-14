import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function Background() {
  const location = useLocation()

  const gradients = {
    '/': 'from-purple-900/20 via-blue-900/20 to-indigo-900/20',
    '/dashboard': 'from-violet-900/20 via-slate-900/20 to-cyan-900/20',
    '/projects': 'from-rose-900/20 via-pink-900/20 to-purple-900/20',
    '/profile': 'from-blue-900/20 via-purple-900/20 to-pink-900/20',
    '/settings': 'from-slate-900/20 via-blue-900/20 to-cyan-900/20',
    '/about': 'from-indigo-900/20 via-purple-900/20 to-blue-900/20',
    '/login': 'from-purple-900/20 via-slate-900/20 to-indigo-900/20',
  }

  const gradient = gradients[location.pathname] || gradients['/']

  return (
    <motion.div 
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 bg-gradient-to-br ${gradient} pointer-events-none z-0`}
    />
  )
}
