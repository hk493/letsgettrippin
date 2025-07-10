// Stripe integration removed - API keys cleared

// Payment intent creation (this would typically be done on your backend)
export const createPaymentIntent = async (amount: number, currency: string = 'jpy') => {
  try {
    // In production, this should call your backend API
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to cents
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create payment intent')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating payment intent:', error)
    // For demo purposes, return a mock response
    return {
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100,
      currency,
    }
  }
}

// Helper function to format currency
export const formatCurrency = (amount: number, currency: string = 'JPY') => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency,
  }).format(amount)
}