import type { Livro, LivroGetParams, LivroResult, RegisterLivro } from '@/types/livro'
import api from './api'
import type { PaginatedResponse } from '@/types/paginatedResponse'
import type { AxiosResponse } from 'axios'
import type { Genero } from '@/types/genero'

export default {
  async getLivros({ page, size = 6, termoBusca }: LivroGetParams): Promise<LivroResult> {
    const response = await api.get<PaginatedResponse<Livro>>('/livros', {
      params: {
        page: page,
        size: size,
        termoBusca: termoBusca,
      },
    })

    const livros: Livro[] = response.data.content
    const totalPages: number = response.data.totalPages

    return {
      livros,
      totalPages,
    }
  },

  async getLivroById(id: string): Promise<Livro> {
    const response = await api.get(`/livros/${id}`)

    return response.data
  },

  async updateLivro(id: string, payload: RegisterLivro): Promise<AxiosResponse> {
    const response = await api.put(`/livros/${id}`, payload)

    return response.data
  },

  async deleteLivro(id: string): Promise<AxiosResponse> {
    const response = await api.delete(`/livros/${id}`)

    return response
  },

  async getGeneros(): Promise<Genero[]> {
    const response = await api.get('/livros/generos')

    const generos: Genero[] = response.data

    return generos
  },

  async registerLivro(payload: RegisterLivro): Promise<AxiosResponse> {
    const response = await api.post('/livros', payload)
    console.log(response)

    return response
  },

  async totalLivros() {
    const response = await api.get('/livros/total')
    return response.data
  },
}
