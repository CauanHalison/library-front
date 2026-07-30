export interface Autor {
  id: string
  nome: string
  dataNascimento: number[]
  nacionalidade: string
}

export interface AutorGetParams {
  page: number
  size?: number
  termoBusca?: string
}

export interface AutorResult {
  autores: Autor[]
  totalPages: number
}

export interface RegisterAutor {
  nome: string
  dataNascimento: Date
  nacionalidade: string
}
