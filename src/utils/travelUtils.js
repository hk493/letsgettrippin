/**
 * 旅行関連のユーティリティ関数
 */

/**
 * 2地点間の移動情報を取得する
 * @param {string} origin - 出発地
 * @param {string} destination - 目的地
 * @returns {Promise<Object>} - 距離と所要時間を含むオブジェクト
 */
export async function getTravelInfo(origin, destination) {
  try {
    const response = await fetch(`/.netlify/functions/calcDistance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Travel API error:', errorText);
      throw new Error('APIエラーが発生しました');
    }
    
    const data = await response.json();
    
    // 結果を整形して返す
    return {
      distance: data.formatted?.distance || data.rows?.[0]?.elements?.[0]?.distance?.text || '不明',
      duration: data.formatted?.duration || data.rows?.[0]?.elements?.[0]?.duration?.text || '不明',
      originName: data.origin_name || origin,
      destinationName: data.destination_name || destination,
      status: data.status,
      rawData: data
    };
  } catch (error) {
    console.error('Travel info error:', error);
    return null;
  }
}

/**
 * 日本の主要都市のリストを取得する
 * @returns {Array<Object>} - 都市情報の配列
 */
export function getJapaneseCities() {
  return [
    { id: 'tokyo', name: '東京', region: '関東', lat: 35.6762, lng: 139.6503 },
    { id: 'osaka', name: '大阪', region: '関西', lat: 34.6937, lng: 135.5023 },
    { id: 'kyoto', name: '京都', region: '関西', lat: 35.0116, lng: 135.7681 },
    { id: 'sapporo', name: '札幌', region: '北海道', lat: 43.0618, lng: 141.3545 },
    { id: 'fukuoka', name: '福岡', region: '九州', lat: 33.5902, lng: 130.4017 },
    { id: 'naha', name: '那覇', region: '沖縄', lat: 26.2124, lng: 127.6809 },
    { id: 'nagoya', name: '名古屋', region: '中部', lat: 35.1815, lng: 136.9066 },
    { id: 'hiroshima', name: '広島', region: '中国', lat: 34.3853, lng: 132.4553 },
    { id: 'sendai', name: '仙台', region: '東北', lat: 38.2682, lng: 140.8694 },
    { id: 'kanazawa', name: '金沢', region: '北陸', lat: 36.5613, lng: 136.6503 },
    { id: 'kobe', name: '神戸', region: '関西', lat: 34.6901, lng: 135.1955 },
    { id: 'kagoshima', name: '鹿児島', region: '九州', lat: 31.5969, lng: 130.5571 },
    { id: 'matsuyama', name: '松山', region: '四国', lat: 33.8416, lng: 132.7661 },
    { id: 'niigata', name: '新潟', region: '中部', lat: 37.9162, lng: 139.0364 },
    { id: 'kumamoto', name: '熊本', region: '九州', lat: 32.8031, lng: 130.7079 }
  ];
}

/**
 * 2地点間の直線距離を計算する (ヘイバーサイン公式)
 * @param {number} lat1 - 地点1の緯度
 * @param {number} lng1 - 地点1の経度
 * @param {number} lat2 - 地点2の緯度
 * @param {number} lng2 - 地点2の経度
 * @returns {number} - 距離 (km)
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // 地球の半径 (km)
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // 距離 (km)
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

/**
 * 都市名から都市情報を取得する
 * @param {string} cityName - 都市名
 * @returns {Object|null} - 都市情報
 */
export function getCityByName(cityName) {
  const cities = getJapaneseCities();
  return cities.find(city => 
    city.name === cityName || 
    city.id === cityName.toLowerCase()
  ) || null;
}

/**
 * 2つの都市間の移動情報を計算する
 * @param {string} fromCity - 出発都市名
 * @param {string} toCity - 目的地都市名
 * @returns {Object} - 移動情報
 */
export function calculateTravelBetweenCities(fromCity, toCity) {
  const city1 = getCityByName(fromCity);
  const city2 = getCityByName(toCity);
  
  if (!city1 || !city2) {
    return {
      distance: '不明',
      duration: '不明',
      originName: fromCity,
      destinationName: toCity
    };
  }
  
  const distance = calculateDistance(city1.lat, city1.lng, city2.lat, city2.lng);
  
  // 大まかな所要時間を計算 (新幹線を想定、平均時速250km)
  const durationHours = distance / 250;
  const durationMinutes = Math.round(durationHours * 60);
  
  let durationText;
  if (durationMinutes >= 60) {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    durationText = `${hours}時間${minutes > 0 ? `${minutes}分` : ''}`;
  } else {
    durationText = `${durationMinutes}分`;
  }
  
  return {
    distance: `${distance.toFixed(1)} km`,
    duration: durationText,
    originName: city1.name,
    destinationName: city2.name,
    status: 'OK'
  };
}