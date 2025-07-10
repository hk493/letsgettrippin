// Cookie management utilities for auto-login functionality

interface CookieOptions {
  expires?: Date
  maxAge?: number
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

export const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (options.expires) {
    cookieString += `; expires=${options.expires.toUTCString()}`
  }

  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`
  }

  if (options.path) {
    cookieString += `; path=${options.path}`
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`
  }

  if (options.secure) {
    cookieString += `; secure`
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`
  }

  document.cookie = cookieString
}

export const getCookie = (name: string): string | null => {
  const nameEQ = encodeURIComponent(name) + '='
  const cookies = document.cookie.split(';')

  for (let cookie of cookies) {
    let c = cookie.trim()
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length))
    }
  }

  return null
}

export const deleteCookie = (name: string, path: string = '/', domain?: string) => {
  let cookieString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`
  
  if (domain) {
    cookieString += `; domain=${domain}`
  }

  document.cookie = cookieString
}

export const setAuthCookie = (token: string, expiresInDays: number = 30) => {
  const expires = new Date()
  expires.setDate(expires.getDate() + expiresInDays)

  setCookie('esim_auth_token', token, {
    expires,
    path: '/',
    secure: window.location.protocol === 'https:',
    sameSite: 'lax'
  })
}

export const getAuthCookie = (): string | null => {
  return getCookie('esim_auth_token')
}

export const clearAuthCookie = () => {
  deleteCookie('esim_auth_token')
}

export const setUserPreferences = (preferences: any) => {
  setCookie('esim_user_prefs', JSON.stringify(preferences), {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
    secure: window.location.protocol === 'https:',
    sameSite: 'lax'
  })
}

export const getUserPreferences = (): any => {
  const prefs = getCookie('esim_user_prefs')
  return prefs ? JSON.parse(prefs) : null
}

// Cookie consent management
export const setCookieConsent = (consent: boolean) => {
  setCookie('esim_cookie_consent', consent.toString(), {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
    secure: window.location.protocol === 'https:',
    sameSite: 'lax'
  })
}

export const getCookieConsent = (): boolean | null => {
  const consent = getCookie('esim_cookie_consent')
  return consent ? consent === 'true' : null
}