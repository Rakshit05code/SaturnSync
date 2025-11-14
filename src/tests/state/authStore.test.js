import { renderHook, act } from '@testing-library/react'
import { useAuthStore } from '../../state/authStore'

describe('AuthStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    })
  })

  it('initializes with no user', () => {
    const { result } = renderHook(() => useAuthStore())
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBeFalse()
  })

  it('logs in user successfully', async () => {
    const { result } = renderHook(() => useAuthStore())

    let loginResult
    await act(async () => {
      loginResult = await result.current.login('test@example.com', 'password')
    })

    expect(loginResult.success).toBe(true)
    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user?.email).toBe('test@example.com')
  })

  it('logs out user', () => {
    const { result } = renderHook(() => useAuthStore())

    act(() => {
      result.current.logout()
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })
})
