import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Header({ onMenuClick }) {
  const location = useLocation()
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.style.colorScheme = isDarkMode ? 'light' : 'dark'
  }

  const pageTitle = {
    '/': 'Home',
    '/dashboard': 'Dashboard',
    '/profile': 'Profile',
    '/settings': 'Settings',
    '/projects': 'Projects',
    '/about': 'About',
  }[location.pathname] || 'Page'

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 backdrop-blur-md bg-glass border-b border-accent/20"
    >
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-accent/20 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-heading font-bold text-accent">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 hover:bg-accent/20 rounded-lg transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-hover cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </div>
      </div>
    </motion.header>
  )
}
