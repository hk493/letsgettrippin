export async function handler(event, context) {
  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

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
    const token = tokenData.access_token;

    // ユーザーから送られた keyword を取得
    const { keyword } = event.queryStringParameters;
    
    if (!keyword || keyword.length < 2) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "検索キーワードは2文字以上必要です" }),
      };
    }

    // IATA検索
    const res = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${encodeURIComponent(keyword)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    // APIからエラーが返ってきた場合
    if (data.errors) {
      console.error("Amadeus API error:", data.errors);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: "空港検索中にエラーが発生しました",
          details: data.errors 
        }),
      };
    }

    // モックデータを追加（APIキーがない場合や、結果が空の場合のフォールバック）
    if (!data.data || data.data.length === 0) {
      const mockData = getMockAirportData(keyword);
      if (mockData.length > 0) {
        data.data = mockData;
      }
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=86400" // 24時間キャッシュ
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("IATA lookup error:", err);
    
    // エラー時はモックデータを返す
    const mockData = getMockAirportData(event.queryStringParameters.keyword || "");
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        data: mockData,
        meta: { count: mockData.length },
        note: "API error occurred, using mock data"
      }),
    };
  }
}

// モック空港データ（APIが使えない場合のフォールバック）
function getMockAirportData(keyword) {
  const airports = [
    // 日本の主要空港
    { iataCode: "NRT", name: "Narita International Airport", cityName: "Tokyo", countryName: "Japan" },
    { iataCode: "HND", name: "Haneda Airport", cityName: "Tokyo", countryName: "Japan" },
    { iataCode: "KIX", name: "Kansai International Airport", cityName: "Osaka", countryName: "Japan" },
    { iataCode: "ITM", name: "Osaka International Airport", cityName: "Osaka", countryName: "Japan" },
    { iataCode: "CTS", name: "New Chitose Airport", cityName: "Sapporo", countryName: "Japan" },
    { iataCode: "FUK", name: "Fukuoka Airport", cityName: "Fukuoka", countryName: "Japan" },
    { iataCode: "OKA", name: "Naha Airport", cityName: "Okinawa", countryName: "Japan" },
    { iataCode: "NGO", name: "Chubu Centrair International Airport", cityName: "Nagoya", countryName: "Japan" },
    { iataCode: "KOJ", name: "Kagoshima Airport", cityName: "Kagoshima", countryName: "Japan" },
    { iataCode: "HIJ", name: "Hiroshima Airport", cityName: "Hiroshima", countryName: "Japan" },
    { iataCode: "KMJ", name: "Kumamoto Airport", cityName: "Kumamoto", countryName: "Japan" },
    { iataCode: "SDJ", name: "Sendai Airport", cityName: "Sendai", countryName: "Japan" },
    { iataCode: "TAK", name: "Takamatsu Airport", cityName: "Takamatsu", countryName: "Japan" },
    { iataCode: "MYJ", name: "Matsuyama Airport", cityName: "Matsuyama", countryName: "Japan" },
    { iataCode: "KMI", name: "Miyazaki Airport", cityName: "Miyazaki", countryName: "Japan" },
    
    // 世界の主要空港
    { iataCode: "LAX", name: "Los Angeles International Airport", cityName: "Los Angeles", countryName: "United States" },
    { iataCode: "JFK", name: "John F. Kennedy International Airport", cityName: "New York", countryName: "United States" },
    { iataCode: "SFO", name: "San Francisco International Airport", cityName: "San Francisco", countryName: "United States" },
    { iataCode: "LHR", name: "Heathrow Airport", cityName: "London", countryName: "United Kingdom" },
    { iataCode: "CDG", name: "Charles de Gaulle Airport", cityName: "Paris", countryName: "France" },
    { iataCode: "SIN", name: "Singapore Changi Airport", cityName: "Singapore", countryName: "Singapore" },
    { iataCode: "HKG", name: "Hong Kong International Airport", cityName: "Hong Kong", countryName: "China" },
    { iataCode: "ICN", name: "Incheon International Airport", cityName: "Seoul", countryName: "South Korea" },
    { iataCode: "PEK", name: "Beijing Capital International Airport", cityName: "Beijing", countryName: "China" },
    { iataCode: "SYD", name: "Sydney Airport", cityName: "Sydney", countryName: "Australia" },
    { iataCode: "BKK", name: "Suvarnabhumi Airport", cityName: "Bangkok", countryName: "Thailand" },
    { iataCode: "DXB", name: "Dubai International Airport", cityName: "Dubai", countryName: "United Arab Emirates" },
    { iataCode: "FRA", name: "Frankfurt Airport", cityName: "Frankfurt", countryName: "Germany" },
    { iataCode: "AMS", name: "Amsterdam Airport Schiphol", cityName: "Amsterdam", countryName: "Netherlands" },
    { iataCode: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", cityName: "Madrid", countryName: "Spain" },
    { iataCode: "FCO", name: "Leonardo da Vinci–Fiumicino Airport", cityName: "Rome", countryName: "Italy" },
    { iataCode: "YVR", name: "Vancouver International Airport", cityName: "Vancouver", countryName: "Canada" },
    { iataCode: "YYZ", name: "Toronto Pearson International Airport", cityName: "Toronto", countryName: "Canada" },
    { iataCode: "MEX", name: "Mexico City International Airport", cityName: "Mexico City", countryName: "Mexico" },
    { iataCode: "GRU", name: "São Paulo–Guarulhos International Airport", cityName: "São Paulo", countryName: "Brazil" }
  ];

  // キーワードで検索（空港コード、空港名、都市名、国名）
  const lowerKeyword = keyword.toLowerCase();
  return airports.filter(airport => 
    airport.iataCode.toLowerCase().includes(lowerKeyword) ||
    airport.name.toLowerCase().includes(lowerKeyword) ||
    airport.cityName.toLowerCase().includes(lowerKeyword) ||
    airport.countryName.toLowerCase().includes(lowerKeyword)
  );
}
