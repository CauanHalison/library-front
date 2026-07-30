<script setup lang="ts">
import { useAutor } from '@/composables/useAutor'
import type { Autor, RegisterAutor } from '@/types/autor'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAlertStore } from '@/stores/alert'
import { formatDates } from '@/utils/date'

const props = defineProps<{
  id?: string
}>()

const router = useRouter()
const alertStore = useAlertStore()

const { isSaving, isLoading, registerAutor, fetchById, updateAutor, deleteAutor } = useAutor()

const isEditMode = computed(() => !!props.id)

const formData = ref<RegisterAutor | Autor>({
  nome: '',
  dataNascimento: new Date(),
  nacionalidade: '',
})

async function sendLivro() {
  let success = false

  if (isEditMode && props.id) {
    success = await updateAutor(props.id, formData.value as RegisterAutor)
  } else {
    success = await registerAutor(formData.value as RegisterAutor)
  }

  if (success) {
    alertStore.showAlert({
      title: `Autor ${isEditMode ? 'Editado' : 'Cadastrado'}!`,
      message: `O autor "${formData.value.nome}" foi ${isEditMode ? 'editado' : 'cadastrado'} com sucesso.`,
      type: 'success',
    })
    router.push('/autores')
  }
}

async function deleteCurrentAutor() {
  const response = await deleteAutor(props.id as string)

  if (response) {
    alertStore.showAlert({
      title: `Autor Excluído!`,
      message: `O Autor "${formData.value.nome}" foi excluído com sucesso.`,
      type: 'success',
    })
    router.push('/autores')
  }
}

onMounted(async () => {
  if (isEditMode && props.id) {
    const autor = await fetchById(props.id)
    if (autor) {
      formData.value = {
        id: autor.id,
        nome: autor.nome,
        nacionalidade: autor.nacionalidade,
        dataNascimento: formatDates(autor.dataNascimento),
      }
    }
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto w-full py-6">
    <div class="flex items-center justify-between mb-6">
      <button
        @click="router.push('/autores')"
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
            {{ isEditMode ? 'Editar' : 'Cadastrar' }} Autor
          </h2>
          <p class="text-sm text-slate-400 mt-1">
            Preencha as informações abaixo para adicionar um autor ao sistema.
          </p>
        </div>

        <form @submit.prevent="sendLivro" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2 space-y-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >Nome Completo</label
              >
              <input
                type="text"
                placeholder="Ex: Machado de Assis"
                v-model="formData.nome"
                required
                :disabled="isSaving || isLoading"
                class="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-200 disabled:opacity-50"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >Nacionalidade</label
              >
              <input
                type="text"
                placeholder="Ex: Brasileira"
                v-model="formData.nacionalidade"
                required
                :disabled="isSaving || isLoading"
                class="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-200 disabled:opacity-50"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >Data de Nascimento</label
              >
              <input
                type="date"
                v-model="formData.dataNascimento"
                required
                :disabled="isSaving || isLoading"
                class="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all duration-200 disabled:opacity-50"
              />
            </div>
          </div>

          <div class="pt-6 border-t border-slate-800/60 flex items-center justify-end gap-3">
            <button
              type="button"
              @click="router.push('/autores')"
              :disabled="isSaving || isLoading"
              class="rounded-xl border border-slate-800 bg-slate-950/20 hover:bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-400 hover:text-slate-200 transition-all duration-200 disabled:opacity-50 active:scale-[0.98]"
            >
              Cancelar
            </button>
            <button
              type="button"
              @click="deleteCurrentAutor()"
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
              <span v-else> Deletar autor </span>
            </button>
            <button
              type="submit"
              :disabled="(isSaving || isLoading) && !isEditMode"
              class="btn-primary w-auto"
            >
              <span v-if="isSaving" class="flex items-center gap-2">
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
              <span v-else>{{ isEditMode ? 'Editar' : 'Cadastrar' }} Autor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
