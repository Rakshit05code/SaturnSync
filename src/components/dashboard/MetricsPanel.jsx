import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { fetchMockMetrics } from '../../services/mockData'

function MetricCard({ label, value, trend, index }) {
  const trendPositive = trend > 0
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05, boxShadow: 'var(--soft-shadow)' }}
      className="p-6 bg-glass border border-accent/30 rounded-xl backdrop-blur"
    >
      <p className="text-foreground-secondary text-sm mb-2">{label}</p>
      <p className="text-3xl font-heading font-bold text-accent mb-2">{value}</p>
      <motion.p
        animate={{ color: trendPositive ? '#10b981' : '#ef4444' }}
        className="text-xs font-mono"
      >
        {trendPositive ? '↑' : '↓'} {Math.abs(trend)}% vs last week
      </motion.p>
    </motion.div>
  )
}

export default function MetricsPanel() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMockMetrics,
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading || !metrics) {
    return (
      <div className="grid md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 bg-glass border border-accent/30 rounded-xl backdrop-blur skeleton h-32" />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
      className="grid md:grid-cols-4 gap-4"
    >
      <MetricCard label="Total Users" value={`${metrics.users.toLocaleString()}`} trend={metrics.trends.users} index={0} />
      <MetricCard label="Revenue" value={`$${metrics.revenue.toLocaleString()}`} trend={metrics.trends.revenue} index={1} />
      <MetricCard label="Engagement" value={`${metrics.engagement}%`} trend={metrics.trends.engagement} index={2} />
      <MetricCard label="Performance" value={metrics.performance.toFixed(1)} trend={metrics.trends.performance} index={3} />
    </motion.div>
  )
}
