# Deployment Guide

## Quick Start

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to Vercel
3. Deploy automatically on push

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify

\`\`\`bash
npm run build
netlify deploy --prod --dir=dist
\`\`\`

### AWS S3 + CloudFront

1. Build application
2. Upload dist/ to S3
3. Create CloudFront distribution
4. Point domain to CloudFront

\`\`\`bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
\`\`\`

## Performance Checklist

- [ ] Lighthouse score > 90
- [ ] Images optimized
- [ ] Code splitting enabled
- [ ] Lazy loading implemented
- [ ] Bundle size < 200KB (gzipped)
- [ ] 3D assets compressed
- [ ] Environment variables secured

## Environment Variables

Set in your deployment platform:

\`\`\`
VITE_API_URL=https://api.production.com
VITE_ENVIRONMENT=production
\`\`\`

## Monitoring

Add monitoring before going live:

- **Sentry** for error tracking
- **Google Analytics** for user analytics
- **LogRocket** for session replay
- **Vercel Analytics** for performance

## SSL/TLS

All deployments should use HTTPS:
- Vercel: Automatic SSL
- Netlify: Automatic SSL
- AWS: Certificate Manager (free)

## Security Headers

Ensure these headers are configured:

\`\`\`
Strict-Transport-Security: max-age=31536000
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Content-Security-Policy: default-src 'self'
\`\`\`

## Rollback Plan

- Keep previous deployment accessible
- Use git tags for releases
- Document deployment process
- Test in staging before production
