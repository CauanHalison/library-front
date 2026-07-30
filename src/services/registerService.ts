import api from './api'

export default {
  async registerUser(payload: object) {
    const response = await api.post('/usuarios', payload)
    return response
  },
}
