const prod = {
  url: {
    API_BASE_URL: 'https://wishmagic-backend-production.up.railway.app',
    OAUTH2_REDIRECT_URI: 'https://wishmagic-client-production.up.railway.app/oauth2/redirect'
  }
}

const dev = {
  url: {
    API_BASE_URL: 'http://localhost:8080',
    OAUTH2_REDIRECT_URI: 'http://localhost:3000/oauth2/redirect'
  }
}

export const config =  dev