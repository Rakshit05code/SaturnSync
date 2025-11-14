import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const navigationItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/projects', label: 'Projects', icon: '💼' },
  { path: '/profile', label: 'Profile', icon: '👤' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
  { path: '/about', label: 'About', icon: 'ℹ️' },
]

export default function Sidebar({ open, onClose }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      />

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -280 }}
        animate={{ x: open ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed lg:static left-0 top-0 w-64 h-screen bg-gradient-to-b from-background to-background-secondary border-r border-accent/20 p-6 z-40 lg:z-0 lg:translate-x-0"
      >
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-heading font-bold text-accent mb-12 mt-4"
        >
          ∆∆
        </motion.h2>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <motion.div key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-accent/30 text-accent' 
                      : 'text-foreground-secondary hover:bg-accent/10 hover:text-foreground'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-body text-sm">{item.label}</span>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-6 left-6 right-6 p-4 bg-accent/10 border border-accent/30 rounded-lg"
        >
          <p className="text-xs text-foreground-secondary mb-2">v1.0.0</p>
          <p className="text-xs font-heading text-accent">Production Ready</p>
        </motion.div>
      </motion.aside>
    </>
  )
}
