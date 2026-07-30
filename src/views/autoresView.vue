<script setup lang="ts">
import ListAutor from '@/components/listAutor.vue'
import RegisterButton from '@/components/registerButton.vue'
import SearchComponent from '@/components/searchComponent.vue'
import { useAutor } from '@/composables/useAutor'
import { onMounted, ref, watch } from 'vue'

const { autores, isLoading, totalPages, currentPage, fetchAutores, nextPage, prevPage, goToPage } =
  useAutor()

const searchTerm = ref<string>('')

watch(searchTerm, (newValue) => {
  fetchAutores(newValue)
})

onMounted(() => {
  fetchAutores()
})
</script>

<template>
  <div class="space-y-8 py-4">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-white">Autores Cadastrados</h1>
        <p class="text-sm text-slate-400 mt-1">
          Conheça os escritores que compõem o acervo literário.
        </p>
      </div>
    </div>

    <SearchComponent :placeholder="'Buscar Autores'" v-model="searchTerm" :with-register="true" />

    <div
      v-if="isLoading"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full"
    >
      <div
        v-for="n in 8"
        :key="n"
        class="animate-pulse rounded-2xl bg-slate-900/30 border border-slate-900 p-6 flex flex-col items-center space-y-5"
      >
        <div class="h-16 w-16 rounded-full bg-slate-800/85"></div>
        <div class="h-5 w-2/3 bg-slate-800/85 rounded"></div>
        <div class="h-5.5 w-1/2 bg-slate-800/80 rounded-full"></div>
        <div class="w-full border-t border-slate-800/60 pt-4 flex flex-col items-center gap-1.5">
          <div class="h-2 w-1/4 bg-slate-800/80 rounded"></div>
          <div class="h-3.5 w-1/3 bg-slate-800/80 rounded"></div>
        </div>
      </div>
    </div>

    <template v-else>
      <div
        v-if="autores.length === 0"
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 class="text-base font-bold text-slate-300">Nenhum autor cadastrado</h3>
        <p class="text-xs text-slate-500 mt-1 max-w-xs">
          Não foi possível encontrar autores cadastrados.
        </p>
      </div>

      <template v-else>
        <ListAutor :autores="autores" />

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
                  ? 'bg-purple-500 text-white border-purple-500 shadow-md shadow-purple-500/10'
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
