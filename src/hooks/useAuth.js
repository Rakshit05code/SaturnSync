import { useEffect } from 'react'
import { useAuthStore } from '../state/authStore'

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, error, restoreSession } = useAuthStore()

  useEffect(() => {
    restoreSession()
  }, [])

  return { user, token, isAuthenticated, isLoading, error }
}
