import { motion, AnimatePresence } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { fetchMockActivity } from '../../services/mockData'

function ActivityItem({ activity, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 5 }}
      className="flex items-center gap-4 p-4 hover:bg-accent/10 rounded-lg transition-colors border-l-2 border-accent/30"
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-hover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-heading text-sm text-foreground truncate">{activity.user}</p>
        <p className="text-xs text-foreground-secondary">{activity.action}</p>
      </div>
      <p className="text-xs text-foreground-secondary flex-shrink-0">{activity.timestamp}</p>
    </motion.div>
  )
}

export default function ActivityFeed() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ['activity'],
    queryFn: fetchMockActivity,
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-glass border border-accent/30 rounded-lg skeleton" />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-glass border border-accent/30 rounded-xl backdrop-blur p-6"
    >
      <h3 className="text-lg font-heading font-bold text-accent mb-4">Recent Activity</h3>
      <div className="space-y-2">
        <AnimatePresence>
          {activities?.map((activity, idx) => (
            <ActivityItem key={activity.id} activity={activity} index={idx} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
