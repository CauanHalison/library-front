import type { Autor, AutorGetParams, AutorResult, RegisterAutor } from '@/types/autor'
import api from './api'
import type { PaginatedResponse } from '@/types/paginatedResponse'
import type { AxiosResponse } from 'axios'

export default {
  async getAutores({ page, size = 10, termoBusca }: AutorGetParams): Promise<AutorResult> {
    const response = await api.get<PaginatedResponse<Autor>>('/autores', {
      params: {
        page: page,
        size: size || 10,
        termoBusca: termoBusca,
      },
    })

    const autores = response.data.content
    const totalPages = response.data.totalPages

    return {
      autores,
      totalPages,
    }
  },

  async getAutorById(id: string): Promise<Autor> {
    const response = await api.get(`/autores/${id}`)

    return response.data
  },

  async updateAutor(id: string, payload: RegisterAutor): Promise<AxiosResponse> {
    const response = await api.put(`/autores/${id}`, payload)

    return response.data
  },

  async deleteAutor(id: string): Promise<AxiosResponse> {
    const response = await api.delete(`/autores/${id}`)

    return response
  },

  async registerAutor(payload: RegisterAutor): Promise<AxiosResponse> {
    const response = await api.post('/autores', payload)

    return response.data
  },

  async totalAutores() {
    const response = await api.get('/autores/total')
    return response.data
  },
}
