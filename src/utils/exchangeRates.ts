// Exchange rate utility with fixed pricing for different countries
// Based on specified pricing structure

interface ExchangeRates {
  [currency: string]: number
}

interface CurrencyInfo {
  code: string
  symbol: string
  name: string
  country: string
}

export const supportedCurrencies: CurrencyInfo[] = [
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan' },
  { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States' },
  { code: 'EUR', symbol: '€', name: 'Euro', country: 'Germany' },
  { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', country: 'Switzerland' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China' },
  { code: 'KRW', symbol: '₩', name: 'Korean Won', country: 'South Korea' },
]

// Fixed pricing structure as specified
export const fixedPrices = {
  // 1GB Plan (900 JPY base)
  basic: {
    JPY: 900,
    USD: 6.00,
    EUR: 6.00,
    GBP: 5.00,
    AUD: 9.00,
    CAD: 8.00,
    CHF: 6.00,
    SGD: 8.00,
    CNY: 45.00,
    KRW: 8000.00,
  },
  // 3GB Plan (1900 JPY base)
  standard: {
    JPY: 1900,
    USD: 12.00,
    EUR: 12.00,
    GBP: 10.00,
    AUD: 19.00,
    CAD: 17.00,
    CHF: 12.00,
    SGD: 17.00,
    CNY: 95.00,
    KRW: 17000.00,
  },
  // 10GB Plan (3900 JPY base)
  premium: {
    JPY: 3900,
    USD: 26.00,
    EUR: 25.00,
    GBP: 21.00,
    AUD: 40.00,
    CAD: 36.00,
    CHF: 24.00,
    SGD: 35.00,
    CNY: 195.00,
    KRW: 35000.00,
  },
}

export const fetchExchangeRates = async (): Promise<ExchangeRates> => {
  // Since we're using fixed pricing, we don't need real exchange rates
  // But we'll return mock rates for compatibility
  return {
    USD: 150.0,
    EUR: 163.0,
    GBP: 180.0,
    AUD: 100.0,
    CAD: 110.0,
    CHF: 165.0,
    SGD: 112.0,
    CNY: 20.0,
    KRW: 0.11,
  }
}

export const getFixedPrice = (planType: 'basic' | 'standard' | 'premium', currency: string): number => {
  return fixedPrices[planType][currency] || fixedPrices[planType].JPY
}

export const formatPrice = (amount: number, currency: string): string => {
  const currencyInfo = supportedCurrencies.find(c => c.code === currency)
  const symbol = currencyInfo?.symbol || '¥'
  
  // Format with appropriate decimal places
  if (currency === 'JPY' || currency === 'KRW') {
    return `${symbol}${Math.round(amount).toLocaleString()}`
  } else if (currency === 'CNY') {
    return `${symbol}${amount.toFixed(2)}`
  } else {
    return `${symbol}${amount.toFixed(2)}`
  }
}

// Get updated plan prices based on fixed pricing structure
export const getUpdatedPlanPrices = (exchangeRates: ExchangeRates, currency: string = 'JPY') => {
  return {
    basic: getFixedPrice('basic', currency),
    standard: getFixedPrice('standard', currency),
    premium: getFixedPrice('premium', currency),
  }
}

// Convert price using fixed pricing (not exchange rates)
export const convertPrice = (jpyPrice: number, targetCurrency: string, exchangeRates: ExchangeRates): number => {
  // Determine plan type based on JPY price
  let planType: 'basic' | 'standard' | 'premium' = 'basic'
  
  if (jpyPrice === 900) planType = 'basic'
  else if (jpyPrice === 1900) planType = 'standard'
  else if (jpyPrice === 3900) planType = 'premium'
  
  return getFixedPrice(planType, targetCurrency)
}