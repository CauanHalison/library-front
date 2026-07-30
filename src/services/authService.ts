import { env } from '@/config/env'
import axios from 'axios'

export default {
  async getTokens(code: string, verifier: string) {
    const response = await axios.post(
      `${env.API_URL}/oauth2/token`,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: env.AUTH_REDIRECT_URI,
        client_id: env.AUTH_CLIENT_ID,
        code_verifier: verifier,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    return response.data
  },
}
