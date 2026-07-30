<script setup lang="ts">
import router from '@/router'
import type { Autor } from '@/types/autor'
import { formatDate } from '@/utils/date'

const autor = defineProps<Autor>()

function goToFormEdit(autorId: string) {
  router.push(`/editar-autor/${autorId}`)
}
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 flex flex-col justify-between h-full"
  >
    <div
      class="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-500/5 blur-xl transition-all duration-300 group-hover:bg-purple-500/15"
    ></div>

    <div class="flex flex-col items-center text-center mt-2">
      <div
        class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-xl font-bold text-white shadow-md shadow-purple-500/10 mb-4 transition-transform duration-300 group-hover:scale-110"
      >
        {{ autor.nome.charAt(0).toUpperCase() }}
      </div>

      <h3
        class="text-lg font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors duration-200 line-clamp-1"
        :title="autor.nome"
      >
        {{ autor.nome }}
      </h3>

      <span
        class="mt-2 inline-flex items-center rounded-full bg-purple-500/10 px-3 py-0.5 text-xs font-semibold text-purple-400 border border-purple-500/20"
      >
        {{ autor.nacionalidade }}
      </span>
    </div>

    <div class="mt-6 pt-4 border-t border-slate-800/60 flex flex-col items-center text-center">
      <span class="text-xs text-slate-500">Nascimento</span>
      <span class="text-sm text-slate-300 font-medium mt-0.5">{{
        formatDate(autor.dataNascimento)
      }}</span>
    </div>
    <div class="mt-4 flex justify-center">
      <button
        @click="goToFormEdit(autor.id)"
        class="cursor-pointer flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-purple-950/20 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-200 active:scale-[0.98]"
      >
        <svg
          class="h-4 w-4 text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Editar Autor
      </button>
    </div>
  </div>
</template>
