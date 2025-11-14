import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useAuthStore } from '../state/authStore'
import AnimatedCard from '../components/ui/AnimatedCard'
import PageTitle from '../components/ui/PageTitle'

export default function Profile() {
  const user = useAuthStore((s) => s.user)
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: user?.name || '' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const handleSave = async () => {
    await updateProfile({ name: formData.name })
    setIsEditing(false)
  }

  return (
    <>
      <Helmet>
        <title>Profile - Bubble React App</title>
      </Helmet>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-20 px-6 pb-12"
      >
        <div className="max-w-2xl mx-auto">
          <PageTitle title="Your Profile" subtitle="Manage your account information" index={0} />

          <AnimatedCard index={0}>
            <div className="text-center mb-8">
              <motion.img
                src={user?.avatar}
                alt={user?.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-accent"
                animate={{ boxShadow: ['0 0 0px rgba(139, 92, 246, 0.5)', '0 0 20px rgba(139, 92, 246, 0.8)', '0 0 0px rgba(139, 92, 246, 0.5)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h3 className="text-2xl font-heading font-bold text-accent">{user?.name}</h3>
              <p className="text-foreground-secondary">{user?.email}</p>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { label: 'Account Status', value: 'Active', icon: '✓' },
                { label: 'Member Since', value: new Date(user?.createdAt).toLocaleDateString(), icon: '📅' },
                { label: 'Account Tier', value: 'Premium', icon: '⭐' },
                { label: 'Role', value: user?.role, icon: '👤' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-accent/10 pb-4 last:border-b-0 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm text-foreground-secondary">{item.label}</p>
                    <p className="text-lg font-heading text-foreground">{item.value}</p>
                  </div>
                  <span className="text-2xl">{item.icon}</span>
                </motion.div>
              ))}
            </div>

            {isEditing ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  className="w-full px-4 py-3 bg-accent/10 border border-accent/30 rounded-lg text-foreground"
                  placeholder="Your name"
                />
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex-1 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg font-heading"
                  >
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg font-heading"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="w-full py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg font-heading transition-colors"
              >
                Edit Profile
              </motion.button>
            )}
          </AnimatedCard>
        </div>
      </motion.div>
    </>
  )
}
