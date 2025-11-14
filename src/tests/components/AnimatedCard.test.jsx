import { render, screen } from '@testing-library/react'
import AnimatedCard from '../../components/ui/AnimatedCard'

describe('AnimatedCard', () => {
  it('renders children correctly', () => {
    render(<AnimatedCard>Test Content</AnimatedCard>)
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedCard className="custom-class">Content</AnimatedCard>,
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with glassmorphism styles', () => {
    const { container } = render(<AnimatedCard>Content</AnimatedCard>)
    const card = container.firstChild
    expect(card).toHaveClass('bg-glass', 'border-accent/30', 'rounded-xl')
  })
})
