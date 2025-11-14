import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login with mock JWT generation
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise((r) => setTimeout(r, 1000))

          // Mock JWT token generation
          const mockToken = generateMockJWT({ email, id: Date.now().toString() })
          const mockUser = {
            id: Date.now().toString(),
            email,
            name: email.split('@')[0],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            role: 'user',
            createdAt: new Date().toISOString(),
          }

          localStorage.setItem('auth_token', mockToken)
          localStorage.setItem('auth_user', JSON.stringify(mockUser))

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          })

          return { success: true, user: mockUser }
        } catch (error) {
          const errorMessage = error.message || 'Login failed'
          set({ error: errorMessage, isLoading: false })
          return { success: false, error: errorMessage }
        }
      },

      // Register new user
      register: async (email, password, name) => {
        set({ isLoading: true, error: null })
        try {
          await new Promise((r) => setTimeout(r, 1200))

          const mockToken = generateMockJWT({ email, id: Date.now().toString() })
          const mockUser = {
            id: Date.now().toString(),
            email,
            name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            role: 'user',
            createdAt: new Date().toISOString(),
          }

          localStorage.setItem('auth_token', mockToken)
          localStorage.setItem('auth_user', JSON.stringify(mockUser))

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          })

          return { success: true, user: mockUser }
        } catch (error) {
          const errorMessage = error.message || 'Registration failed'
          set({ error: errorMessage, isLoading: false })
          return { success: false, error: errorMessage }
        }
      },

      // Logout
      logout: () => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        })
      },

      // Update user profile
      updateProfile: async (updates) => {
        set({ isLoading: true, error: null })
        try {
          await new Promise((r) => setTimeout(r, 800))

          const updatedUser = { ...get().user, ...updates }
          localStorage.setItem('auth_user', JSON.stringify(updatedUser))

          set({ user: updatedUser, isLoading: false })
          return { success: true, user: updatedUser }
        } catch (error) {
          set({ error: error.message, isLoading: false })
          return { success: false, error: error.message }
        }
      },

      // Restore session from storage
      restoreSession: () => {
        const token = localStorage.getItem('auth_token')
        const user = localStorage.getItem('auth_user')

        if (token && user) {
          try {
            const parsedUser = JSON.parse(user)
            set({ token, user: parsedUser, isAuthenticated: true })
            return true
          } catch (e) {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_user')
            return false
          }
        }
        return false
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

// Mock JWT generation (simplified)
function generateMockJWT(payload) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 86400 }))
  const signature = btoa('mock-signature')
  return `${header}.${body}.${signature}`
}

export function decodeMockJWT(token) {
  try {
    const parts = token.split('.')
    const payload = JSON.parse(atob(parts[1]))
    return payload
  } catch (e) {
    return null
  }
}
