describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('displays login page', () => {
    cy.contains('Sign in to your account').should('be.visible')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
  })

  it('logs in with valid credentials', () => {
    cy.get('input[type="email"]').type('demo@example.com')
    cy.get('input[type="password"]').type('password123')
    cy.get('button').contains('Sign In').click()

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  })

  it('shows error with invalid credentials', () => {
    cy.get('input[type="email"]').type('invalid@example.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.get('button').contains('Sign In').click()

    cy.contains('Login failed').should('be.visible')
  })
})

describe('Dashboard Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[type="email"]').type('demo@example.com')
    cy.get('input[type="password"]').type('password123')
    cy.get('button').contains('Sign In').click()
    cy.url().should('include', '/dashboard')
  })

  it('navigates to different pages', () => {
    cy.get('a').contains('Home').click()
    cy.url().should('include', '/')

    cy.get('a').contains('Profile').click()
    cy.url().should('include', '/profile')

    cy.get('a').contains('Settings').click()
    cy.url().should('include', '/settings')
  })

  it('displays metrics on dashboard', () => {
    cy.contains('Total Users').should('be.visible')
    cy.contains('Revenue').should('be.visible')
    cy.contains('Engagement').should('be.visible')
  })
})
