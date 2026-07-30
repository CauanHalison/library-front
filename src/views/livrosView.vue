<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import LivrosList from '../components/listLivro.vue'
import { useLivros } from '@/composables/useLivros.ts'
import SearchComponent from '@/components/searchComponent.vue'
import RegisterButton from '@/components/registerButton.vue'

const { livros, isLoading, currentPage, totalPages, fetchLivros, nextPage, prevPage, goToPage } =
  useLivros()

const searchTerm = ref<string>('')

watch(searchTerm, (newValue) => {
  fetchLivros(newValue)
})

onMounted(() => {
  fetchLivros()
})
</script>

<template>
  <div class="space-y-8 py-4">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-white">Catálogo de Livros</h1>
        <p class="text-sm text-slate-400 mt-1">
          Explore, busque e filtre o acervo completo da biblioteca.
        </p>
      </div>
    </div>

    <SearchComponent v-model="searchTerm" :placeholder="'Busca Livros'" :with-register="true" />

    <div v-if="isLoading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
      <div
        v-for="n in 6"
        :key="n"
        class="animate-pulse rounded-2xl bg-slate-900/30 border border-slate-900 p-6 space-y-5"
      >
        <div class="flex justify-between items-center">
          <div class="h-5 w-16 bg-slate-800/80 rounded-full"></div>
          <div class="h-3 w-20 bg-slate-800/80 rounded"></div>
        </div>
        <div class="space-y-2">
          <div class="h-6 w-3/4 bg-slate-800/80 rounded"></div>
          <div class="h-6 w-1/2 bg-slate-800/80 rounded"></div>
        </div>
        <div class="flex items-center gap-2 pt-2">
          <div class="h-8 w-8 rounded-full bg-slate-800/80"></div>
          <div class="space-y-1.5 w-1/2">
            <div class="h-2 w-1/3 bg-slate-800/80 rounded"></div>
            <div class="h-3 w-full bg-slate-800/80 rounded"></div>
          </div>
        </div>
        <div class="border-t border-slate-800/60 pt-4 flex justify-between">
          <div class="space-y-1.5 w-1/3">
            <div class="h-2.5 w-1/2 bg-slate-800/80 rounded"></div>
            <div class="h-4.5 w-full bg-slate-800/80 rounded"></div>
          </div>
          <div class="space-y-1.5 w-1/3 flex flex-col items-end">
            <div class="h-2.5 w-1/2 bg-slate-800/80 rounded"></div>
            <div class="h-4.5 w-full bg-slate-800/80 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <template v-else>
      <div
        v-if="livros.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center border border-slate-800/60 rounded-2xl bg-slate-900/10 backdrop-blur-sm"
      >
        <svg
          class="h-12 w-12 text-slate-600 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <h3 class="text-base font-bold text-slate-300">Nenhum livro cadastrado</h3>
        <p class="text-xs text-slate-500 mt-1 max-w-xs">
          Não foi possível encontrar livros neste servidor.
        </p>
      </div>

      <template v-else>
        <LivrosList :livros="livros" />

        <div class="mt-8 flex items-center justify-between border-t border-slate-900 pt-6">
          <button
            @click="prevPage"
            :disabled="currentPage === 0"
            class="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed select-none active:scale-[0.98]"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>

          <div class="hidden sm:flex items-center gap-1.5">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page - 1)"
              :class="[
                'px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 select-none active:scale-[0.98]',
                currentPage === page - 1
                  ? 'bg-indigo-500 text-white border-indigo-500 shadow-md shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700',
              ]"
            >
              {{ page }}
            </button>
          </div>

          <div class="sm:hidden text-xs text-slate-400 font-mono">
            Página {{ currentPage + 1 }} de {{ totalPages }}
          </div>

          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages - 1"
            class="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed select-none active:scale-[0.98]"
          >
            Próximo
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </template>
    </template>
  </div>
</template>
