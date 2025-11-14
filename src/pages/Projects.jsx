import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { fetchMockProjects } from '../services/mockData'
import AnimatedCard from '../components/ui/AnimatedCard'
import PageTitle from '../components/ui/PageTitle'

function ProjectCard({ project, index }) {
  const statusColors = {
    'Active': '#10b981',
    'In Progress': '#f59e0b',
    'Planning': '#6366f1',
  }

  return (
    <AnimatedCard index={index}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-heading text-foreground">{project.title}</h3>
          <p className="text-sm text-foreground-secondary mt-1">{project.description}</p>
        </div>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-xs px-3 py-1 rounded-full text-white whitespace-nowrap ml-4"
          style={{ backgroundColor: statusColors[project.status] }}
        >
          {project.status}
        </motion.span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <p className="text-xs text-foreground-secondary">Progress</p>
          <p className="text-xs font-heading text-accent">{project.progress}%</p>
        </div>
        <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent-hover"
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1.5, delay: index * 0.2 }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-foreground-secondary">
        <div>
          <p>Team: <span className="font-heading">{project.team}</span></p>
        </div>
        <div className="text-right">
          <p>Due: <span className="font-heading">{new Date(project.dueDate).toLocaleDateString()}</span></p>
        </div>
      </div>
    </AnimatedCard>
  )
}

export default function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchMockProjects,
    staleTime: 1000 * 60 * 5,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  return (
    <>
      <Helmet>
        <title>Projects - Bubble React App</title>
      </Helmet>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-20 px-6 pb-12"
      >
        <div className="max-w-4xl mx-auto">
          <PageTitle title="Projects" subtitle="Track your ongoing projects and milestones" index={0} />

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-glass border border-accent/30 rounded-xl skeleton" />
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {projects?.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  )
}
