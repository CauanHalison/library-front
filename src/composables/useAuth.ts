import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { createPkcePair } from '@/utils/pkce'
import { env } from '@/config/env'
import authService from '@/services/authService'
import { jwtDecode } from 'jwt-decode'

export function useAuth() {
  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()

  const loginRedirect = async (): Promise<void> => {
    const { verifier, challenge } = await createPkcePair()

    window.sessionStorage.setItem('code_verifier', verifier)

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: env.AUTH_CLIENT_ID,
      redirect_uri: env.AUTH_REDIRECT_URI,
      code_challenge: challenge,
      code_challenge_method: 'S256',
    })

    window.location.href = `${env.API_URL}/oauth2/authorize?${params.toString()}`
  }

  const registerRedirect = () => {
    router.push('/register')
  }

  const processCallback = async (): Promise<void> => {
    const code = route.query.code as string
    const verifier = sessionStorage.getItem('code_verifier') as string

    try {
      const data = await authService.getTokens(code, verifier)

      const token = data.access_token

      authStore.setTokens(token, '')
      sessionStorage.removeItem('code_verifier')
      router.push('/')
    } catch (error) {
      console.error(error)
      router.push('/login')
    }
  }

  const getAuthorities = (): string[] => {
    const token: string = localStorage.getItem('token') as string

    const decodedToken = jwtDecode(token)

    return decodedToken['authorities' as keyof typeof decodedToken] as string[]
  }

  return {
    loginRedirect,
    registerRedirect,
    processCallback,
    getAuthorities,
  }
}
