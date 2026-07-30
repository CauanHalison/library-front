import type { Autor } from './autor'

export interface Livro {
  id: string
  isbn: string
  titulo: string
  dataPublicacao: number[]
  genero: string
  preco: number
  autor: Autor
}

export interface LivroGetParams {
  page: number
  size?: number
  termoBusca?: string
}

export interface LivroResult {
  livros: Livro[]
  totalPages: number
}

export interface RegisterLivro {
  titulo: string
  isbn: string
  autor: string
  dataPublicacao: Date
  preco: number
  genero: string
}
