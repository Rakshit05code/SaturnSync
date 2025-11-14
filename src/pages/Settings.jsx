import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import AnimatedCard from '../components/ui/AnimatedCard'
import PageTitle from '../components/ui/PageTitle'

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    analytics: true,
    darkMode: true,
    emailUpdates: false,
    twoFactor: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const toggleSetting = (key) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }))
  }

  const settingCategories = [
    {
      title: 'Notifications',
      items: [
        { key: 'notifications', label: 'Push Notifications', desc: 'Receive real-time alerts' },
        { key: 'emailUpdates', label: 'Email Updates', desc: 'Weekly summary emails' },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        { key: 'analytics', label: 'Analytics', desc: 'Help us improve by tracking usage' },
        { key: 'twoFactor', label: '2-Factor Authentication', desc: 'Enhanced security' },
      ],
    },
    {
      title: 'Appearance',
      items: [{ key: 'darkMode', label: 'Dark Mode', desc: 'Easier on the eyes' }],
    },
  ]

  return (
    <>
      <Helmet>
        <title>Settings - Bubble React App</title>
      </Helmet>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-20 px-6 pb-12"
      >
        <div className="max-w-2xl mx-auto">
          <PageTitle title="Settings" subtitle="Manage your preferences and security" index={0} />

          {settingCategories.map((category, catIndex) => (
            <motion.div key={category.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: catIndex * 0.1 }} className="mb-8">
              <h3 className="text-lg font-heading text-accent mb-4">{category.title}</h3>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <AnimatedCard key={item.key} index={catIndex * 10 + itemIndex}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => toggleSetting(item.key)}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex-1">
                        <h4 className="text-foreground font-heading text-sm">{item.label}</h4>
                        <p className="text-foreground-secondary text-xs mt-1">{item.desc}</p>
                      </div>
                      <motion.div
                        animate={{ backgroundColor: settings[item.key] ? '#8b5cf6' : 'rgba(139, 92, 246, 0.3)' }}
                        className="w-12 h-6 rounded-full flex items-center p-1"
                      >
                        <motion.div
                          animate={{ x: settings[item.key] ? 24 : 0 }}
                          className="w-5 h-5 bg-white rounded-full"
                        />
                      </motion.div>
                    </motion.div>
                  </AnimatedCard>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
