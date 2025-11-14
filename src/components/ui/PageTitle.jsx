import { motion } from 'framer-motion'

export default function PageTitle({ title, subtitle, index = 0 }) {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } },
  }

  return (
    <motion.div variants={titleVariants} initial="hidden" animate="visible" className="mb-12">
      <h2 className="text-4xl font-heading font-bold text-accent mb-2">{title}</h2>
      {subtitle && <p className="text-foreground-secondary mt-2">{subtitle}</p>}
    </motion.div>
  )
}
