// Amadeus API client - API keys removed
class AmadeusClient {
  constructor() {
    this.baseUrl = 'https://test.api.amadeus.com'
    this.clientId = '' // API key removed
    this.clientSecret = '' // API key removed
    this.accessToken = null
    this.tokenExpiry = null
  }

  async getAccessToken() {
    console.log('❌ Amadeus API disabled - API keys removed')
    throw new Error('Amadeus API disabled - API keys removed')
  }

  async searchFlights(params) {
    console.log('❌ Amadeus flight search disabled - API keys removed')
    throw new Error('Amadeus API disabled - API keys removed')
  }
}

export const amadeusClient = new AmadeusClient()