// Amadeus API integration with frontend token fetching
interface AmadeusConfig {
  clientId: string
  clientSecret: string
  baseUrl: string
}

interface FlightSearchParams {
  origin: string
  destination: string
  departureDate: string
  returnDate?: string
  adults: number
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST'
}

interface HotelSearchParams {
  cityCode: string
  checkInDate: string
  checkOutDate: string
  adults: number
  rooms?: number
}

interface BookingRequest {
  type: 'flight' | 'hotel' | 'package'
  searchParams: FlightSearchParams | HotelSearchParams
  selectedOffer: any
  travelerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    nationality: string
  }[]
  paymentInfo: {
    cardNumber: string
    expiryDate: string
    cvv: string
    holderName: string
  }
}

// フロントエンドからAmadeusトークンを取得
export const getAmadeusToken = async () => {
  try {
    const response = await fetch('/.netlify/functions/amadeusToken');
    
    if (!response.ok) {
      const text = await response.text();
      console.error('APIエラー:', text);
      return null;
    }

    const data = await response.json();
    console.log('取得したトークン:', data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('トークン取得エラー:', error);
    return null;
  }
};

// フロントエンドからフライト検索
export const searchFlightsFromFrontend = async (params: FlightSearchParams) => {
  try {
    const token = await getAmadeusToken();
    if (!token) {
      console.warn('トークンが取得できませんでした。モックデータを返します。');
      return getMockFlightData(params);
    }

    const searchParams = new URLSearchParams({
      originLocationCode: params.origin,
      destinationLocationCode: params.destination,
      departureDate: params.departureDate,
      adults: params.adults.toString(),
    });

    if (params.returnDate) {
      searchParams.append('returnDate', params.returnDate);
    }

    if (params.travelClass) {
      searchParams.append('travelClass', params.travelClass);
    }

    const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?${searchParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('フライト検索APIエラー:', response.status, response.statusText);
      return getMockFlightData(params);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('フライト検索エラー:', error);
    return getMockFlightData(params);
  }
};

// フロントエンドからホテル検索
export const searchHotelsFromFrontend = async (params: HotelSearchParams) => {
  try {
    const token = await getAmadeusToken();
    if (!token) {
      console.warn('トークンが取得できませんでした。モックデータを返します。');
      return getMockHotelData(params);
    }

    const searchParams = new URLSearchParams({
      cityCode: params.cityCode,
      checkInDate: params.checkInDate,
      checkOutDate: params.checkOutDate,
      adults: params.adults.toString(),
    });

    if (params.rooms) {
      searchParams.append('roomQuantity', params.rooms.toString());
    }

    const response = await fetch(`https://test.api.amadeus.com/v3/shopping/hotel-offers?${searchParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('ホテル検索APIエラー:', response.status, response.statusText);
      return getMockHotelData(params);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('ホテル検索エラー:', error);
    return getMockHotelData(params);
  }
};

// モックフライトデータ
const getMockFlightData = (params: FlightSearchParams) => {
  return [
    {
      id: 'mock-flight-1',
      price: { total: '85000', currency: 'JPY' },
      itineraries: [{
        duration: 'PT11H30M',
        segments: [{
          departure: { 
            iataCode: params.origin, 
            at: `${params.departureDate}T10:00:00` 
          },
          arrival: { 
            iataCode: params.destination, 
            at: `${params.departureDate}T06:30:00` 
          },
          carrierCode: 'JL',
          number: '62'
        }]
      }]
    },
    {
      id: 'mock-flight-2',
      price: { total: '92000', currency: 'JPY' },
      itineraries: [{
        duration: 'PT12H15M',
        segments: [{
          departure: { 
            iataCode: params.origin, 
            at: `${params.departureDate}T14:30:00` 
          },
          arrival: { 
            iataCode: params.destination, 
            at: `${params.departureDate}T10:45:00` 
          },
          carrierCode: 'NH',
          number: '175'
        }]
      }]
    }
  ];
};

// モックホテルデータ
const getMockHotelData = (params: HotelSearchParams) => {
  return [
    {
      id: 'mock-hotel-1',
      name: 'Tokyo Grand Hotel',
      offers: [{
        price: { total: '15000', currency: 'JPY' },
        room: { type: 'STANDARD', description: 'Standard Room' }
      }]
    },
    {
      id: 'mock-hotel-2',
      name: 'Shibuya Business Hotel',
      offers: [{
        price: { total: '12000', currency: 'JPY' },
        room: { type: 'BUSINESS', description: 'Business Room' }
      }]
    }
  ];
};

class AmadeusService {
  private config: AmadeusConfig
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  constructor() {
    this.config = {
      clientId: '', // API key removed
      clientSecret: '', // API key removed
      baseUrl: 'https://test.api.amadeus.com'
    }
  }

  private async getAccessToken(): Promise<string> {
    console.error('❌ Amadeus API disabled - API keys removed')
    throw new Error('Amadeus API disabled - API keys removed')
  }

  async searchFlights(params: FlightSearchParams) {
    console.error('❌ Amadeus flight search disabled - API keys removed')
    throw new Error('Amadeus API disabled - API keys removed')
  }

  async searchHotels(params: HotelSearchParams) {
    console.error('❌ Amadeus hotel search disabled - API keys removed')
    throw new Error('Amadeus API disabled - API keys removed')
  }

  async createBooking(bookingRequest: BookingRequest) {
    console.error('❌ Amadeus booking disabled - API keys removed')
    throw new Error('Amadeus API disabled - API keys removed')
  }
}

export const amadeusService = new AmadeusService()
export type { FlightSearchParams, HotelSearchParams, BookingRequest }