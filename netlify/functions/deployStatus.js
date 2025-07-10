export async function handler(event, context) {
  // Get the site ID and deploy ID from environment variables
  const siteId = process.env.NETLIFY_SITE_ID;
  const deployId = event.queryStringParameters?.deploy_id;

  if (!siteId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing NETLIFY_SITE_ID environment variable' })
    };
  }

  if (!deployId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing deploy_id query parameter' })
    };
  }

  try {
    // Get the Netlify API token from environment variables
    const netlifyToken = process.env.NETLIFY_API_TOKEN;
    
    if (!netlifyToken) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing NETLIFY_API_TOKEN environment variable' })
      };
    }

    // Fetch the deploy status from Netlify API
    const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys/${deployId}`, {
      headers: {
        Authorization: `Bearer ${netlifyToken}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: 'Failed to fetch deploy status', 
          details: errorText 
        })
      };
    }

    const deployData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: deployData.id,
        state: deployData.state,
        deploy_url: deployData.deploy_url,
        deploy_ssl_url: deployData.deploy_ssl_url,
        created_at: deployData.created_at,
        updated_at: deployData.updated_at,
        claimed: deployData.claimed || false
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
