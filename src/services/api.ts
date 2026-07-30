import router from '@/router'
import { useAlertStore } from '@/stores/alert'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      const alertStore = useAlertStore()

      let title = 'Erro na Operação'
      let message = 'Não foi possível completar a requisição.'

      if (error.response) {
        const data = error.response.data
        message = data?.message || data?.error || message

        const statusCode = error.response.status
        if (!data?.message && !data?.error) {
          if (statusCode === 400) message = 'Requisição inválida. Verifique os dados inseridos.'
          else if (statusCode === 403) message = 'Você não tem permissão para realizar esta ação.'
          else if (statusCode === 404) message = 'O recurso solicitado não foi encontrado.'
          else if (statusCode >= 500)
            message = 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.'
        }
        title = statusCode >= 500 ? 'Erro no Servidor' : 'Aviso'
      } else if (error.request) {
        title = 'Falha de Conexão'
        message = 'Não foi possível conectar ao servidor. Verifique sua conexão de rede.'
      } else {
        message = error.message || message
      }

      alertStore.showAlert({
        title,
        message,
        type: 'error',
      })
    }
    return Promise.reject(error)
  },
)

export default api
