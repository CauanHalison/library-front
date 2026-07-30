<script setup lang="ts">
import { useLivros } from '@/composables/useLivros'
import type { Livro, RegisterLivro } from '@/types/livro'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SearchComponent from '../components/searchComponent.vue'
import { useAutor } from '@/composables/useAutor'
import type { Autor } from '@/types/autor.ts'
import type { Genero } from '@/types/genero.ts'
import { useAlertStore } from '@/stores/alert'
import { formatDates } from '@/utils/date.ts'

const props = defineProps<{
  id?: string
}>()

const router = useRouter()
const alertStore = useAlertStore()
const { autores, fetchAutores } = useAutor()

const {
  isSaving,
  isLoading,
  generos,
  registerLivro,
  getGeneros,
  fetchById,
  updateLivro,
  deleteLivro,
} = useLivros()

const searchAutor = ref<string>('')
const selectedAutorNome = ref<string>('')

const isEditMode = computed(() => !!props.id)

const formData = ref<RegisterLivro | Livro>({
  titulo: '',
  isbn: '',
  dataPublicacao: new Date(),
  preco: 0,
  autor: '',
  genero: '',
})

watch(searchAutor, (newValue) => {
  if (newValue === selectedAutorNome.value) {
    return
  }
  formData.value.autor = ''
  selectedAutorNome.value = ''
  fetchAutores(newValue)
})

function selectAutor(autor: Autor) {
  formData.value.autor = autor.id
  searchAutor.value = autor.nome
  selectedAutorNome.value = autor.nome
  autores.value = []
}

function selectGenero(genero: Genero) {
  formData.value.genero = genero.valor
}

async function sendLivro() {
  let success = false

  if (props.id && isEditMode) {
    success = await updateLivro(props.id, formData.value as RegisterLivro)
  } else {
    success = await registerLivro(formData.value as RegisterLivro)
  }

  if (success) {
    alertStore.showAlert({
      title: `Livro ${isEditMode ? 'Editado' : 'Cadastrado'}!`,
      message: `O livro "${formData.value.titulo}" foi ${isEditMode ? 'editado' : 'cadastrado'} com sucesso.`,
      type: 'success',
    })
    router.push('/livros')
  }
}

async function deleteCurrentLivro() {
  const response = await deleteLivro(props.id as string)

  if (response) {
    alertStore.showAlert({
      title: `Livro Excluído!`,
      message: `O livro "${formData.value.titulo}" foi excluído com sucesso.`,
      type: 'success',
    })
    router.push('/livros')
  }
}

onMounted(async () => {
  getGeneros()

  if (props.id && isEditMode) {
    const livro = await fetchById(props.id)

    if (livro) {
      formData.value = {
        id: livro.id,
        titulo: livro.titulo,
        isbn: livro.isbn,
        dataPublicacao: formatDates(livro.dataPublicacao),
        preco: livro.preco,
        autor: livro.autor.id,
        genero: livro.genero,
      }

      selectedAutorNome.value = livro.autor.nome
      searchAutor.value = livro.autor.nome
    }
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto w-full py-6">
    <div class="flex items-center justify-between mb-6">
      <button
        @click="router.push('/livros')"
        class="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:text-white px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-200 active:scale-[0.98]"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar ao Catálogo
      </button>
    </div>

    <div
      class="relative overflow-hidden rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md p-6 shadow-xl sm:p-10"
    >
      <div
        class="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"
      ></div>
      <div
        class="absolute -left-24 -bottom-24 h-48 w-48 rounded-full bg-purple-500/5 blur-3xl pointer-events-none"
      ></div>

      <div class="relative z-10">
        <div class="mb-8">
          <h2 class="text-2xl font-bold tracking-tight text-white">
            {{ isEditMode ? 'Editar' : 'Cadastrar' }} Livro
          </h2>
          <p class="text-sm text-slate-400 mt-1">
            Preencha as informações abaixo para adicionar o livro ao acervo.
          </p>
        </div>

        <form @submit.prevent="sendLivro" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2 space-y-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >Título do Livro</label
              >
              <input
                type="text"
                placeholder="Ex: Dom Casmurro"
                v-model="formData.titulo"
                required
                :disabled="isSaving || isLoading"
                class="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-200 disabled:opacity-50"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >Autor</label
              >
              <SearchComponent :placeholder="'Autor'" v-model="searchAutor" />
              <div class="max-h-[100px] overflow-y-auto custom-scroll">
                <div
                  v-for="autor in autores"
                  :key="autor.id"
                  @click="selectAutor(autor)"
                  class="cursor-pointer w-full rounded-xl border-2 border-solid border-slate-800 px-3 py-2"
                >
                  {{ autor.nome }}
                </div>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >ISBN</label
              >
              <input
                type="text"
                placeholder="Ex: 978-3-16-148410-0"
                v-model="formData.isbn"
                required
                :disabled="isSaving || isLoading"
                class="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-200 disabled:opacity-50"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >Gênero</label
              >
              <div class="flex flex-wrap gap-2">
                <div
                  class="text-sm w-auto rounded-xl cursor-pointer border-2 border-solid border-slate-800 px-3 py-2 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20"
                  v-for="genero in generos"
                  @click="selectGenero(genero)"
                  :class="{
                    'border-indigo-500 bg-indigo-500/50 text-white-900':
                      genero.valor === formData.genero,
                  }"
                >
                  {{ genero.descricao }}
                </div>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >Preço (R$)</label
              >
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                v-model="formData.preco"
                required
                :disabled="isSaving || isLoading"
                class="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-200 disabled:opacity-50"
              />
            </div>

            <div class="md:col-span-2 space-y-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >Data de Publicação</label
              >
              <input
                type="date"
                v-model="formData.dataPublicacao"
                required
                :disabled="isSaving || isLoading"
                class="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-200 disabled:opacity-50"
              />
            </div>
          </div>

          <div class="pt-6 border-t border-slate-800/60 flex items-center justify-end gap-3">
            <button
              type="button"
              @click="router.push('/livros')"
              :disabled="isSaving || isLoading"
              class="cursor-pointer rounded-xl border border-slate-800 bg-slate-950/20 hover:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-400 hover:text-slate-200 transition-all duration-200 disabled:opacity-50 active:scale-[0.98]"
            >
              Cancelar
            </button>
            <button
              type="button"
              @click="deleteCurrentLivro()"
              :disabled="isSaving || isLoading"
              v-if="isEditMode"
              class="cursor-pointer rounded-xl border border-slate-800 bg-red-600 hover:bg-red-900 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 disabled:opacity-50 active:scale-[0.98]"
            >
              <span v-if="(isSaving || isLoading) && isEditMode" class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Deletando...
              </span>
              <span v-else> Deletar livro </span>
            </button>
            <button type="submit" :disabled="isSaving || isLoading" class="btn-primary w-auto">
              <span v-if="(isSaving || isLoading) && !isEditMode" class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Salvando...
              </span>
              <span v-else>{{ isEditMode ? 'Editar' : 'Cadastrar' }} Livro</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
