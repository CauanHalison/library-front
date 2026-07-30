import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import 'pinia-plugin-persistedstate'
import { env } from '@/config/env'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(window.localStorage.getItem('token') || '')
  const refreshToken = ref(window.localStorage.getItem('refreshToken') || '')

  const setTokens = (newToken: string, newRefreshToken: string) => {
    token.value = newToken

    if (newRefreshToken) {
      refreshToken.value = newRefreshToken
    }

    window.localStorage.setItem('token', token.value)
    window.localStorage.setItem('refresh_token', refreshToken.value)
  }

  const isAuthenticated = computed(() => !!token.value)

  const logout = () => {
    token.value = ''
    refreshToken.value = ''
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('refreshToken')
    window.location.href = `${env.API_URL}/logout`
  }

  return {
    token,
    refreshToken,
    isAuthenticated,
    setTokens,
    logout,
  }
})
