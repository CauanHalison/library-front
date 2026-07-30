import autorServise from '@/services/autorServise'
import type { Autor, AutorResult, RegisterAutor } from '@/types/autor'
import { ref } from 'vue'

export function useAutor() {
  const autores = ref<Autor[]>([])
  const totalAutores = ref<number>(0)
  const isLoading = ref<boolean>(false)
  const isSaving = ref<boolean>(false)

  const currentPage = ref<number>(0)
  const totalPages = ref<number>(0)

  const fetchAutores = async (termoBusca?: string): Promise<void> => {
    isLoading.value = true
    try {
      const response: AutorResult = await autorServise.getAutores({
        page: currentPage.value,
        termoBusca: termoBusca,
      })

      autores.value = response.autores
      totalPages.value = response.totalPages
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const fetchById = async (id: string): Promise<Autor | null> => {
    isLoading.value = true
    try {
      return await autorServise.getAutorById(id)
    } catch (error) {
      console.log(error)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const updateAutor = async (id: string, payload: RegisterAutor) => {
    isSaving.value = true
    try {
      await autorServise.updateAutor(id, payload)
      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
      isSaving.value = false
    }
  }

  const deleteAutor = async (id: string) => {
    isLoading.value = true
    try {
      await autorServise.deleteAutor(id)
      return true
    } catch (error) {
      console.log(error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const nextPage = async () => {
    currentPage.value++
    await fetchAutores()
  }

  const prevPage = async () => {
    currentPage.value--
    await fetchAutores()
  }

  const goToPage = async (page: number) => {
    currentPage.value = page
    await fetchAutores()
  }

  const registerAutor = async (payload: RegisterAutor) => {
    isSaving.value = true

    try {
      await autorServise.registerAutor(payload)

      return true
    } catch (error) {
      console.log(error)
      return false
    } finally {
      isSaving.value = false
    }
  }

  const getTotalAutores = async () => {
    try {
      const data = await autorServise.totalAutores()

      totalAutores.value = data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    autores,
    totalAutores,
    isLoading,
    isSaving,
    currentPage,
    totalPages,
    fetchAutores,
    nextPage,
    prevPage,
    goToPage,
    registerAutor,
    getTotalAutores,
    fetchById,
    updateAutor,
    deleteAutor,
  }
}
