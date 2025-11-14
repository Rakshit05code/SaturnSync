import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import AnimatedCard from '../components/ui/AnimatedCard'
import PageTitle from '../components/ui/PageTitle'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      desc: 'Built with Vite for blazing performance and instant HMR',
    },
    {
      icon: '🎬',
      title: 'Animated',
      desc: 'Smooth transitions with Framer Motion and GSAP',
    },
    {
      icon: '🌐',
      title: '3D Ready',
      desc: 'Interactive 3D scenes with Three.js and react-three-fiber',
    },
    {
      icon: '📱',
      title: 'Responsive',
      desc: 'Mobile-first design that works on all devices',
    },
    {
      icon: '♿',
      title: 'Accessible',
      desc: 'WCAG AA compliant with keyboard navigation',
    },
    {
      icon: '🚀',
      title: 'Optimized',
      desc: 'Code splitting, lazy loading, and compression',
    },
  ]

  return (
    <>
      <Helmet>
        <title>Home - Bubble React App</title>
        <meta name="description" content="A production-ready React application with advanced animations, 3D integration, and modern web technologies" />
        <meta property="og:title" content="Bubble React App" />
        <meta property="og:description" content="Production-ready React SPA with Vite, Tailwind CSS, and Three.js" />
      </Helmet>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-20 px-6 pb-12"
      >
        <div className="max-w-6xl mx-auto">
          <PageTitle title="Welcome to the Future" subtitle="A production-ready React application with advanced animations and 3D integration" index={0} />

          {/* Hero content */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <motion.div
              className="inline-block text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-hover to-accent mb-6"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              style={{ backgroundSize: '200% auto' }}
            >
              Build Faster
            </motion.div>
          </motion.div>

          {/* Features grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {features.map((feature, i) => (
              <AnimatedCard key={i} index={i}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-heading text-accent mb-2">{feature.title}</h3>
                <p className="text-foreground-secondary text-sm">{feature.desc}</p>
              </AnimatedCard>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-heading font-bold rounded-lg transition-all shadow-lg"
            >
              Explore Dashboard
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
