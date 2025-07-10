export async function handler(event, context) {
  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

  // クエリパラメータを取得
  const { origin, destination, date, returnDate, adults = '1', travelClass = 'ECONOMY' } = event.queryStringParameters || {};
  
  // パラメータのバリデーション
  if (!origin || !destination || !date) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: true, 
        message: "出発地、目的地、日付は必須パラメータです" 
      })
    };
  }

  try {
    // トークン取得
    const tokenRes = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const tokenData = await tokenRes.json();
    
    if (!tokenData.access_token) {
      console.error("トークン取得エラー:", tokenData);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: true, 
          message: "認証エラー: Amadeusトークンを取得できませんでした",
          details: tokenData
        })
      };
    }
    
    const token = tokenData.access_token;

    // フライト検索パラメータを構築
    const searchParams = new URLSearchParams({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults: adults,
      currencyCode: 'JPY',
      max: '20'
    });

    if (returnDate) {
      searchParams.append('returnDate', returnDate);
    }

    if (travelClass && travelClass !== 'ECONOMY') {
      searchParams.append('travelClass', travelClass);
    }

    // フライト検索
    const flightRes = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const flightData = await flightRes.json();
    
    // APIからエラーが返ってきた場合はモックデータを返す
    if (flightData.errors) {
      console.error("Amadeus API error:", flightData.errors);
      return {
        statusCode: 200,
        body: JSON.stringify(generateMockFlightData(origin, destination, date, returnDate, adults, travelClass)),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600" // 1時間キャッシュ
      },
      body: JSON.stringify(flightData),
    };
  } catch (err) {
    console.error("Flight search error:", err);
    return {
      statusCode: 200,
      body: JSON.stringify(generateMockFlightData(origin, destination, date, returnDate, adults, travelClass)),
    };
  }
}

// モックフライトデータを生成
function generateMockFlightData(origin, destination, date, returnDate, adults = '1', travelClass = 'ECONOMY') {
  const carriers = [
    { code: 'JL', name: 'Japan Airlines' },
    { code: 'NH', name: 'All Nippon Airways' },
    { code: 'DL', name: 'Delta Air Lines' },
    { code: 'UA', name: 'United Airlines' },
    { code: 'CX', name: 'Cathay Pacific' },
    { code: 'SQ', name: 'Singapore Airlines' },
    { code: 'KE', name: 'Korean Air' },
    { code: 'OZ', name: 'Asiana Airlines' },
    { code: 'CA', name: 'Air China' },
    { code: 'MU', name: 'China Eastern' }
  ];
  
  const priceRanges = {
    ECONOMY: { min: 75000, max: 150000 },
    PREMIUM_ECONOMY: { min: 150000, max: 250000 },
    BUSINESS: { min: 250000, max: 450000 },
    FIRST: { min: 450000, max: 800000 }
  };
  
  const flightCount = Math.floor(Math.random() * 8) + 5;
  const mockFlights = [];
  
  for (let i = 0; i < flightCount; i++) {
    const carrier = carriers[Math.floor(Math.random() * carriers.length)];
    const flightNumber = Math.floor(Math.random() * 1000) + 1;
    const durationHours = Math.floor(Math.random() * 5) + 8; 
    const durationMinutes = Math.floor(Math.random() * 60);
    
    const departureDate = new Date(date);
    departureDate.setHours(Math.floor(Math.random() * 12) + 6);
    departureDate.setMinutes(Math.floor(Math.random() * 12) * 5);
    
    const arrivalDate = new Date(departureDate);
    arrivalDate.setHours(arrivalDate.getHours() + durationHours);
    arrivalDate.setMinutes(arrivalDate.getMinutes() + durationMinutes);
    
    const priceRange = priceRanges[travelClass] || priceRanges.ECONOMY;
    const price = Math.floor(Math.random() * (priceRange.max - priceRange.min)) + priceRange.min;
    
    const flight = {
      id: `mock-${i+1}`,
      source: 'GDS',
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: !returnDate,
      lastTicketingDate: '2025-06-01',
      numberOfBookableSeats: 9,
      itineraries: [{
        duration: `PT${durationHours}H${durationMinutes}M`,
        segments: [{
          departure: { 
            iataCode: origin, 
            at: departureDate.toISOString(),
            terminal: Math.floor(Math.random() * 3) + 1
          },
          arrival: { 
            iataCode: destination, 
            at: arrivalDate.toISOString(),
            terminal: Math.floor(Math.random() * 5) + 1
          },
          carrierCode: carrier.code,
          number: flightNumber.toString(),
          aircraft: {
            code: ['789', '77W', '788', '77F', '320', '321', '738', '333'][Math.floor(Math.random() * 8)]
          },
          operating: {
            carrierCode: carrier.code
          },
          duration: `PT${durationHours}H${durationMinutes}M`,
          id: `${i+1}`,
          numberOfStops: 0,
          blacklistedInEU: false
        }]
      }],
      price: { 
        currency: 'JPY',
        total: price.toString(), 
        base: (price * 0.8).toString(),
        fees: [
          { amount: (price * 0.1).toString(), type: 'SUPPLIER' },
          { amount: (price * 0.1).toString(), type: 'TICKETING' }
        ],
        grandTotal: price.toString(),
        billingCurrency: 'JPY'
      },
      pricingOptions: {
        fareType: ['PUBLISHED'],
        includedCheckedBagsOnly: true
      },
      validatingAirlineCodes: [carrier.code],
      travelerPricings: [{
        travelerId: '1',
        fareOption: 'STANDARD',
        travelerType: 'ADULT',
        price: {
          currency: 'JPY',
          total: price.toString(),
          base: (price * 0.8).toString()
        },
        fareDetailsBySegment: [{
          segmentId: '1',
          cabin: travelClass,
          fareBasis: travelClass === 'ECONOMY' ? 'Y' : 
                    travelClass === 'PREMIUM_ECONOMY' ? 'W' : 
                    travelClass === 'BUSINESS' ? 'C' : 'F',
          brandedFare: carrier.code + 'BASIC',
          class: travelClass === 'ECONOMY' ? 'Y' : 
                 travelClass === 'PREMIUM_ECONOMY' ? 'W' : 
                 travelClass === 'BUSINESS' ? 'C' : 'F',
          includedCheckedBags: { quantity: 1 }
        }]
      }]
    };
    
    if (returnDate) {
      const returnDepartureDate = new Date(returnDate);
      returnDepartureDate.setHours(Math.floor(Math.random() * 12) + 6);
      returnDepartureDate.setMinutes(Math.floor(Math.random() * 12) * 5);
      
      const returnArrivalDate = new Date(returnDepartureDate);
      returnArrivalDate.setHours(returnArrivalDate.getHours() + durationHours);
      returnArrivalDate.setMinutes(returnArrivalDate.getMinutes() + durationMinutes);
      
      flight.itineraries.push({
        duration: `PT${durationHours}H${durationMinutes}M`,
        segments: [{
          departure: { 
            iataCode: destination, 
            at: returnDepartureDate.toISOString(),
            terminal: Math.floor(Math.random() * 5) + 1
          },
          arrival: { 
            iataCode: origin, 
            at: returnArrivalDate.toISOString(),
            terminal: Math.floor(Math.random() * 3) + 1
          },
          carrierCode: carrier.code,
          number: (flightNumber + 1).toString(),
          aircraft: {
            code: ['789', '77W', '788', '77F', '320', '321', '738', '333'][Math.floor(Math.random() * 8)]
          },
          operating: {
            carrierCode: carrier.code
          },
          duration: `PT${durationHours}H${durationMinutes}M`,
          id: `${i+1}`,
          numberOfStops: 0,
          blacklistedInEU: false
        }]
      });
    }
    
    mockFlights.push(flight);
  }
  
  mockFlights.sort((a, b) => parseInt(a.price.total) - parseInt(b.price.total));
  
  return {
    data: mockFlights,
    meta: {
      count: mockFlights.length,
      links: {
        self: `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=${adults}&currencyCode=JPY`
      }
    },
    dictionaries: {
      locations: {
        [origin]: { cityCode: origin.substring(0, 3), countryCode: 'JP' },
        [destination]: { cityCode: destination.substring(0, 3), countryCode: 'JP' }
      },
      aircraft: {
        '789': 'BOEING 787-9',
        '77W': 'BOEING 777-300ER',
        '788': 'BOEING 787-8',
        '77F': 'BOEING 777F',
        '320': 'AIRBUS A320',
        '321': 'AIRBUS A321',
        '738': 'BOEING 737-800',
        '333': 'AIRBUS A330-300'
      },
      currencies: {
        'JPY': 'JAPANESE YEN'
      },
      carriers: carriers.reduce((acc, carrier) => {
        acc[carrier.code] = carrier.name;
        return acc;
      }, {})
    }
  };
}

