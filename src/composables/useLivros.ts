import livroService from '@/services/livroService'
import type { Genero } from '@/types/genero'
import type { Livro, LivroResult, RegisterLivro } from '@/types/livro'
import { ref } from 'vue'

export function useLivros() {
  const livros = ref<Livro[]>([])
  const totalLivros = ref<number>(0)
  const generos = ref<Genero[]>([])
  const isLoading = ref<boolean>(false)
  const isSaving = ref<boolean>(false)

  const currentPage = ref<number>(0)
  const totalPages = ref<number>(0)

  const fetchLivros = async (termoBusca?: string): Promise<void> => {
    isLoading.value = true
    try {
      const response: LivroResult = await livroService.getLivros({
        page: currentPage.value,
        termoBusca: termoBusca,
      })

      livros.value = response.livros
      totalPages.value = response.totalPages
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchById = async (id: string): Promise<Livro | null> => {
    isLoading.value = true
    try {
      return await livroService.getLivroById(id)
    } catch (error) {
      console.log(error)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const updateLivro = async (id: string, payload: RegisterLivro) => {
    isSaving.value = true
    try {
      await livroService.updateLivro(id, payload)
      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
      isSaving.value = false
    }
  }

  const deleteLivro = async (id: string) => {
    isSaving.value = true
    try {
      await livroService.deleteLivro(id)
      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
      isSaving.value = false
    }
  }

  const nextPage = async () => {
    ;(currentPage.value++, await fetchLivros())
  }

  const prevPage = async () => {
    ;(currentPage.value--, await fetchLivros())
  }

  const goToPage = async (page: number) => {
    currentPage.value = page
    await fetchLivros()
  }

  const registerLivro = async (payload: RegisterLivro) => {
    isSaving.value = true
    try {
      await livroService.registerLivro(payload)

      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
      isSaving.value = false
    }
  }

  const getTotalLivros = async () => {
    try {
      const data = await livroService.totalLivros()

      totalLivros.value = data
    } catch (error) {
      console.log(error)
    }
  }

  const getGeneros = async () => {
    isLoading.value = true
    try {
      generos.value = await livroService.getGeneros()
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    livros,
    totalLivros,
    generos,
    isLoading,
    isSaving,
    currentPage,
    totalPages,
    fetchLivros,
    nextPage,
    prevPage,
    goToPage,
    registerLivro,
    getTotalLivros,
    getGeneros,
    fetchById,
    updateLivro,
    deleteLivro,
  }
}
