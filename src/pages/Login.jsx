import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuthStore } from '../state/authStore'

export default function Login() {
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('password123')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login, error, clearError } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    clearError()

    const result = await login(email, password)
    setLoading(false)

    if (result.success) {
      const from = location.state?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      <Helmet>
        <title>Login - Bubble React App</title>
      </Helmet>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-background to-background-secondary"
      >
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-md"
        >
          <div className="mb-12 text-center">
            <motion.h1 variants={itemVariants} className="text-4xl font-heading font-bold text-accent mb-2">
              ∆∆
            </motion.h1>
            <motion.p variants={itemVariants} className="text-foreground-secondary">
              Sign in to your account
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div 
                variants={itemVariants}
                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <label className="block text-sm text-foreground-secondary mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-glass border border-accent/30 rounded-lg text-foreground placeholder-foreground-secondary/50 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm text-foreground-secondary mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 bg-glass border border-accent/30 rounded-lg text-foreground placeholder-foreground-secondary/50 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-foreground-secondary hover:text-foreground"
                >
                  {showPassword ? '👁' : '👁‍🗨'}
                </button>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-8 bg-accent hover:bg-accent-hover text-white font-heading font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⟳</span> Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="mt-8 p-6 bg-accent/10 border border-accent/30 rounded-lg">
            <p className="text-xs text-foreground-secondary mb-3">Demo Credentials:</p>
            <div className="space-y-1 font-mono text-xs">
              <p>Email: <span className="text-accent">demo@example.com</span></p>
              <p>Password: <span className="text-accent">password123</span></p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}
