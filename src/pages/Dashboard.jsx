import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Suspense, lazy } from 'react'
import MetricsPanel from '../components/dashboard/MetricsPanel'
import ActivityFeed from '../components/dashboard/ActivityFeed'

const ThreeCanvas = lazy(() => import('../components/dashboard/ThreeCanvas'))

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Bubble React App</title>
        <meta name="description" content="Real-time metrics and interactive 3D visualization dashboard" />
      </Helmet>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-20 px-6 pb-12"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl font-heading font-bold text-accent">Dashboard</h2>
            <p className="text-foreground-secondary mt-2">Real-time metrics and interactive 3D visualization</p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div variants={itemVariants} className="mb-8">
            <MetricsPanel />
          </motion.div>

          {/* 3D and Activity Section */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-glass border border-accent/30 rounded-xl backdrop-blur overflow-hidden h-96 shadow-lg">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-foreground-secondary">
                    <div className="text-center">
                      <div className="animate-spin mb-2">⟳</div>
                      <p className="text-sm">Loading 3D visualization...</p>
                    </div>
                  </div>
                }
              >
                <ThreeCanvas />
              </Suspense>
            </div>

            <ActivityFeed />
          </motion.div>

          {/* Info cards */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { title: '3D Visualization', desc: 'Interactive rotating sphere with real-time data' },
              { title: 'Live Updates', desc: 'Metrics refresh every 5 minutes automatically' },
              { title: 'Performance Optimized', desc: 'Lazy-loaded 3D with Draco compression' },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-accent/10 border border-accent/30 rounded-lg"
              >
                <h4 className="font-heading text-accent text-sm mb-1">{card.title}</h4>
                <p className="text-foreground-secondary text-xs">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
