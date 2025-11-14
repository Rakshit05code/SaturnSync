export const mockMetrics = {
  users: 12543,
  revenue: 42300,
  engagement: 78.9,
  performance: 94.2,
  trends: {
    users: 5.2,
    revenue: 12.1,
    engagement: 2.3,
    performance: 0.8,
  },
}

export const mockProjects = [
  {
    id: '1',
    title: 'Project Alpha',
    description: 'AI-powered analytics platform',
    status: 'Active',
    progress: 85,
    team: 5,
    dueDate: '2024-03-15',
  },
  {
    id: '2',
    title: 'Project Beta',
    description: 'Mobile application redesign',
    status: 'In Progress',
    progress: 62,
    team: 3,
    dueDate: '2024-04-20',
  },
  {
    id: '3',
    title: 'Project Gamma',
    description: 'Cloud infrastructure migration',
    status: 'Planning',
    progress: 23,
    team: 4,
    dueDate: '2024-05-10',
  },
]

export const mockActivity = [
  { id: '1', user: 'Alex Chen', action: 'Completed task', timestamp: '2 hours ago' },
  { id: '2', user: 'Jordan Smith', action: 'Created new project', timestamp: '4 hours ago' },
  { id: '3', user: 'Sam Taylor', action: 'Updated documentation', timestamp: '1 day ago' },
]

export async function fetchMockMetrics() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMetrics), 300)
  })
}

export async function fetchMockProjects() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProjects), 400)
  })
}

export async function fetchMockActivity() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockActivity), 350)
  })
}
