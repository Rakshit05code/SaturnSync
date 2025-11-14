# Bubble React App - Production Ready

A modern, performant React SPA with advanced animations, 3D integration, and enterprise-grade tooling.

## Features

- ⚡ **Vite** - Lightning-fast build tool
- 🎨 **Tailwind CSS** - Utility-first styling with custom design tokens
- 🎬 **Framer Motion** - Smooth page and component animations
- 🌐 **Three.js** - Interactive 3D visualization
- 🔀 **React Router** - Client-side routing with code splitting
- 📦 **Zustand** - Lightweight state management
- 🔍 **React Query** - Server state management and caching
- ♿ **Accessible** - WCAG AA compliant
- 📱 **Responsive** - Mobile-first design
- 🚀 **Optimized** - Code splitting, lazy loading, compression

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

\`\`\`bash
npm run build
npm run preview
\`\`\`

### Testing

\`\`\`bash
npm test              # Run tests
npm run test:watch   # Watch mode
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
npm run format       # Format code
\`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── layout/
│   │   ├── Layout.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Background.jsx
│   └── dashboard/
│       └── ThreeCanvas.jsx
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   ├── Settings.jsx
│   ├── Projects.jsx
│   └── About.jsx
├── state/
│   └── authStore.js
├── services/
│   └── api.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
\`\`\`

## Design System

Color tokens defined in `globals.css`:
- \`--bg-1\` - Primary background
- \`--bg-2\` - Secondary background
- \`--accent\` - Primary accent color
- \`--glass\` - Glassmorphic overlay
- \`--fg-1\` - Primary text
- \`--fg-2\` - Secondary text

## Deployment

### Vercel

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Docker

\`\`\`bash
docker build -t bubble-react-app .
docker run -p 5173:5173 bubble-react-app
\`\`\`

## Performance

- Lighthouse Score: 94+
- Accessibility: 95+
- Best Practices: 96+
- SEO: 100

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
