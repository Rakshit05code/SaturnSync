# Development Guide

## Setup

### Prerequisites
- Node.js 16+
- npm 8+ or yarn 1.22+

### Installation

\`\`\`bash
npm install
\`\`\`

## Development Server

\`\`\`bash
npm run dev
\`\`\`

Server runs at `http://localhost:5173`

## Building

\`\`\`bash
npm run build
npm run preview
\`\`\`

## Testing

### Unit Tests
\`\`\`bash
npm test
npm run test:watch
\`\`\`

### E2E Tests
\`\`\`bash
npm run cypress:open  # Interactive mode
npm run cypress:run   # Headless
\`\`\`

## Linting & Formatting

\`\`\`bash
npm run lint
npm run lint:fix
npm run format
\`\`\`

## Project Structure

\`\`\`
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components
│   └── dashboard/      # Dashboard components
├── pages/              # Page components
├── hooks/              # Custom hooks
├── state/              # Zustand stores
├── services/           # API and utility services
├── styles/             # Global styles and tokens
├── tests/              # Test files
└── main.jsx            # Entry point
\`\`\`

## Key Technologies

- **Vite**: Build tool and dev server
- **React 18**: UI library
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS
- **Framer Motion**: Animation library
- **Three.js**: 3D graphics
- **Zustand**: State management
- **React Query**: Server state management
- **Axios**: HTTP client
- **Jest**: Testing framework
- **Cypress**: E2E testing

## Code Style

ESLint + Prettier configuration is enforced via pre-commit hooks.

### Manual formatting
\`\`\`bash
npm run format
\`\`\`

## Environment Variables

Copy \`.env.example\` to \`.env.local\` and update values:

\`\`\`
VITE_API_URL=https://api.example.com
VITE_ENVIRONMENT=development
\`\`\`

## Docker

### Build
\`\`\`bash
docker build -t bubble-react-app .
\`\`\`

### Run
\`\`\`bash
docker run -p 3000:3000 bubble-react-app
\`\`\`

## Performance Tips

1. Use React DevTools Profiler to identify bottlenecks
2. Code split routes using lazy() and Suspense
3. Memoize expensive components with React.memo
4. Use useCallback for event handlers
5. Lazy load images and 3D assets

## Deployment

### Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify
\`\`\`bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
\`\`\`

### Docker
See Dockerfile for production-ready container setup.

## Troubleshooting

### Port already in use
\`\`\`bash
kill -9 $(lsof -t -i :5173)
\`\`\`

### Clear cache
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### 3D not rendering
Check browser console for WebGL errors. Ensure GPU acceleration is enabled.
