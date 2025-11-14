import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import AnimatedCard from '../components/ui/AnimatedCard'
import PageTitle from '../components/ui/PageTitle'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const sections = [
    {
      title: 'Built with Modern Tech',
      desc: 'Engineered with cutting-edge technologies for performance and scalability',
      items: ['Vite', 'React 18', 'TypeScript', 'Tailwind CSS'],
    },
    {
      title: 'Advanced Features',
      desc: 'Smooth animations and interactive 3D visualizations',
      items: ['Framer Motion', 'GSAP', 'Three.js', 'react-three-fiber'],
    },
    {
      title: 'State Management',
      desc: 'Efficient data handling and real-time updates',
      items: ['Zustand', 'React Query', 'Axios', 'JWT Auth'],
    },
    {
      title: 'Performance First',
      desc: 'Optimized for speed with code splitting and lazy loading',
      items: ['Code Splitting', 'Lazy Loading', 'Image Optimization', 'PWA Ready'],
    },
    {
      title: 'Fully Responsive',
      desc: 'Perfect experience across all devices and screen sizes',
      items: ['Mobile-First', 'Adaptive Design', 'Touch Optimized', 'Accessible'],
    },
    {
      title: 'Production Ready',
      desc: 'Comprehensive tooling and testing infrastructure',
      items: ['ESLint', 'Prettier', 'Jest', 'Cypress'],
    },
  ]

  return (
    <>
      <Helmet>
        <title>About - Bubble React App</title>
      </Helmet>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-20 px-6 pb-12"
      >
        <div className="max-w-5xl mx-auto">
          <PageTitle title="About This App" subtitle="A showcase of modern React development" index={0} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 p-8 bg-gradient-to-r from-accent/20 to-accent-hover/20 border border-accent/30 rounded-xl text-center"
          >
            <h3 className="text-2xl font-heading text-accent mb-3">Bubble → React Conversion</h3>
            <p className="text-foreground-secondary">
              Successfully converted from a no-code Bubble application to a production-ready React SPA with enhanced functionality, performance, and maintainability.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sections.map((section, i) => (
              <AnimatedCard key={i} index={i}>
                <h4 className="text-lg font-heading text-accent mb-2">{section.title}</h4>
                <p className="text-foreground-secondary text-sm mb-4">{section.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: j * 0.1 }}
                      className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full border border-accent/30"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </AnimatedCard>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
