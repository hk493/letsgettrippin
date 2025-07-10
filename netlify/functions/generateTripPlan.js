const axios = require('axios');

const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { destination, duration, budget, interests, transportPreference } = JSON.parse(event.body);

    // TripAdvisor APIを使用して目的地の観光スポットを検索
    const attractionsResponse = await axios.get(
      `https://api.tripadvisor.com/v1/location/search`,
      {
        params: {
          key: process.env.VITE_TRIPADVISOR_API_KEY,
          location: destination,
          category: 'attractions'
        }
      }
    );

    // 観光スポットの詳細情報を取得
    const attractionsDetails = await Promise.all(
      attractionsResponse.data.data
        .slice(0, 10) // 上位10件のみ処理
        .map(async (attraction) => {
          // Google Maps APIで移動時間を計算
          const trainTimeResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json`,
            {
              params: {
                origins: destination,
                destinations: `${attraction.latitude},${attraction.longitude}`,
                mode: 'transit',
                key: process.env.VITE_GOOGLE_MAPS_API_KEY
              }
            }
          );

          const carTimeResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json`,
            {
              params: {
                origins: destination,
                destinations: `${attraction.latitude},${attraction.longitude}`,
                mode: 'driving',
                key: process.env.VITE_GOOGLE_MAPS_API_KEY
              }
            }
          );

          return {
            name: attraction.name,
            description: attraction.description || '',
            rating: attraction.rating || 0,
            location: {
              lat: attraction.latitude,
              lng: attraction.longitude
            },
            travelTime: {
              byTrain: trainTimeResponse.data.rows[0].elements[0].duration.text,
              byCar: carTimeResponse.data.rows[0].elements[0].duration.text
            }
          };
        })
    );

    // OpenAI APIを使用して旅行プランの概要を生成
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "あなたは日本旅行の専門家です。ユーザーの希望に合わせた詳細な旅行プランを提案してください。"
          },
          {
            role: "user",
            content: `以下の条件で旅行プランを作成してください：
              目的地: ${destination}
              日数: ${duration}日間
              予算: ${budget}円
              興味: ${interests.join(', ')}
              移動手段: ${transportPreference}

              以下の観光スポット情報も考慮してください：
              ${attractionsDetails.map(spot => 
                `- ${spot.name}（評価: ${spot.rating}）
                 電車での所要時間: ${spot.travelTime.byTrain}
                 車での所要時間: ${spot.travelTime.byCar}`
              ).join('\n')}

              日数と予算に合わせて、効率的な周遊プランを提案してください。
              移動時間も考慮して、1日に回れる適切な数のスポットを選んでください。`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // 移動手段の推奨を決定
    const recommendedTransport = (() => {
      const avgTrainTime = attractionsDetails.reduce((sum, spot) => 
        sum + parseInt(spot.travelTime.byTrain.replace(/\D/g, '')), 0) / attractionsDetails.length;
      const avgCarTime = attractionsDetails.reduce((sum, spot) => 
        sum + parseInt(spot.travelTime.byCar.replace(/\D/g, '')), 0) / attractionsDetails.length;

      if (avgTrainTime < avgCarTime * 1.2) return 'train';
      if (avgCarTime < avgTrainTime * 0.8) return 'car';
      return 'both';
    })();

    // 総移動時間を計算
    const totalTravelTime = {
      byTrain: `約${Math.round(attractionsDetails.reduce((sum, spot) => 
        sum + parseInt(spot.travelTime.byTrain.replace(/\D/g, '')), 0) / 60)}時間`,
      byCar: `約${Math.round(attractionsDetails.reduce((sum, spot) => 
        sum + parseInt(spot.travelTime.byCar.replace(/\D/g, '')), 0) / 60)}時間`
    };

    const finalPlan = {
      overview: openaiResponse.data.choices[0].message.content,
      attractions: {
        data: attractionsDetails
      },
      route: {
        recommendedTransport,
        totalTravelTime
      }
    };

    return {
      statusCode: 200,
      body: JSON.stringify(finalPlan),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: '旅行プランの生成中にエラーが発生しました。',
        details: error.message 
      }),
    };
  }
};

module.exports = { handler }; 