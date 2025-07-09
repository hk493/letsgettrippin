const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const input = event.queryStringParameters.input;
  const language = event.queryStringParameters.language || 'en';
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!input) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'input is required' }),
    };
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}&language=${language}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Netlify-Function/1.0)',
        'Referer': 'https://tubular-pie-835f20.netlify.app/'
      }
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
