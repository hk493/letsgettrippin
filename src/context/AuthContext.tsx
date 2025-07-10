import React, { useEffect, useState, createContext, useContext } from 'react'
import { setAuthCookie, getAuthCookie, clearAuthCookie, setUserPreferences } from '../utils/cookieManager'

export type Order = {
  id: string
  planName: string
  price: number
  duration: string
  data: string
  date: string
  status: 'Active' | 'Expired' | 'Processing'
}

export type User = {
  id: string
  email?: string
  name?: string
  picture?: string
  verified: boolean
  orders: Order[]
  stripeCustomerId?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  needsVerification: boolean
  login: (language?: string) => Promise<void>
  logout: () => void
  auth0Client: any | null
  addOrder: (order: Order) => void
  updateUserProfile: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [auth0Client, setAuth0Client] = useState<any | null>(null)

  // Get saved language from localStorage
  const getSavedLanguage = () => {
    try {
      const saved = localStorage.getItem('esim_language')
      if (saved) return saved
    } catch (error) {
      console.log('Could not load saved language')
    }
    
    // Fallback to browser language detection
    const lang = navigator.language || navigator.languages[0]
    if (lang.startsWith('ja')) return 'ja'
    if (lang.startsWith('zh')) return 'zh'
    if (lang.startsWith('ko')) return 'ko'
    return 'en'
  }

  // Load user orders from localStorage
  const loadUserOrders = (userId: string): Order[] => {
    try {
      const stored = localStorage.getItem(`orders_${userId}`)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  // Save user orders to localStorage
  const saveUserOrders = (userId: string, orders: Order[]) => {
    try {
      localStorage.setItem(`orders_${userId}`, JSON.stringify(orders))
    } catch (error) {
      console.error('Failed to save orders:', error)
    }
  }

  // Create or get Stripe customer
  const createStripeCustomer = async (authUser: any): Promise<string | undefined> => {
    try {
      const response = await fetch('/api/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: authUser.email,
          name: authUser.name,
          auth0_id: authUser.sub
        })
      })

      if (response.ok) {
        const { customer_id } = await response.json()
        return customer_id
      }
    } catch (error) {
      console.error('Failed to create Stripe customer:', error)
    }
    
    // Return mock customer ID for demo
    return `cus_${authUser.sub?.replace('|', '_')}`
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Auth0 integration removed - API keys cleared
        // Mock authentication for demo purposes
        const mockUser: User = {
          id: 'demo_user_' + Date.now(),
          email: 'demo@example.com',
          name: 'Demo User',
          picture: '',
          verified: true,
          orders: [],
          stripeCustomerId: 'demo_customer'
        }
        
        setUser(mockUser)
        setAuth0Client({})
        
        // Save user preferences
        setUserPreferences({
          language: getSavedLanguage(),
          lastLogin: new Date().toISOString()
        })
      } catch (err: any) {
        console.error('Auth initialization error:', err)
        setError(err.message || 'Authentication initialization failed')
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (language?: string) => {
    try {
      setError(null)
      // Mock login for demo
      const mockUser: User = {
        id: 'demo_user_' + Date.now(),
        email: 'demo@example.com',
        name: 'Demo User',
        picture: '',
        verified: true,
        orders: [],
        stripeCustomerId: 'demo_customer'
      }
      setUser(mockUser)
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Login failed')
    }
  }

  const logout = () => {
    setUser(null)
    setError(null)
    clearAuthCookie()
  }

  const addOrder = (order: Order) => {
    if (!user) return
    
    const updatedOrders = [order, ...user.orders]
    const updatedUser = { ...user, orders: updatedOrders }
    
    setUser(updatedUser)
    saveUserOrders(user.id, updatedOrders)
    
    // Sync with Stripe (create payment record)
    syncOrderWithStripe(order, user)
  }

  const syncOrderWithStripe = async (order: Order, user: User) => {
    try {
      await fetch('/api/sync-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: user.stripeCustomerId,
          order_id: order.id,
          amount: order.price * 100,
          currency: 'jpy',
          description: `${order.planName} - ${order.duration}`,
          metadata: {
            plan_name: order.planName,
            duration: order.duration,
            data: order.data,
            auth0_user_id: user.id
          }
        })
      })
    } catch (error) {
      console.error('Failed to sync order with Stripe:', error)
    }
  }

  const updateUserProfile = (updates: Partial<User>) => {
    if (!user) return
    
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    
    // Sync with Auth0 if needed
    if (updates.name || updates.email) {
      syncUserWithAuth0(updatedUser)
    }
  }

  const syncUserWithAuth0 = async (user: User) => {
    try {
      // Auth0 sync removed - API keys cleared
      console.log('Auth0 sync disabled - API keys removed')
    } catch (error) {
      console.error('Failed to sync user with Auth0:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        needsVerification: !user?.verified && !!user,
        login,
        logout,
        auth0Client,
        addOrder,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}