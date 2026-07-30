<script setup lang="ts">
import router from '@/router'
import type { Livro } from '@/types/livro'
import { formatDate, formatPrice } from '@/utils/date'

const livro = defineProps<Livro>()

function goToEdit(livroId: string) {
  router.push(`/editar-livro/${livroId}`)
}
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between h-full"
  >
    <div
      class="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-indigo-500/5 blur-xl transition-all duration-300 group-hover:bg-indigo-500/15"
    ></div>

    <div>
      <div class="mb-4 flex items-center justify-between">
        <span
          class="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20"
        >
          {{ livro.genero }}
        </span>
        <span class="text-xs text-slate-500 font-mono">ISBN: {{ livro.isbn || 'N/A' }}</span>
      </div>

      <h3
        class="line-clamp-2 text-lg font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors duration-200"
        :title="livro.titulo"
      >
        {{ livro.titulo }}
      </h3>

      <div class="mt-4 flex items-center gap-2">
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white shadow-sm"
        >
          {{ livro.autor.nome.charAt(0).toUpperCase() }}
        </div>
        <div class="overflow-hidden">
          <p class="text-xs text-slate-500">Autor</p>
          <p class="truncate text-sm font-medium text-slate-300" :title="livro.autor.nome">
            {{ livro.autor.nome }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
      <div class="flex flex-col">
        <span class="text-xs text-slate-500">Publicação</span>
        <span class="text-sm text-slate-300 font-medium">{{
          formatDate(livro.dataPublicacao)
        }}</span>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-xs text-slate-500">Valor</span>
        <span class="text-base font-bold text-emerald-400">{{ formatPrice(livro.preco) }}</span>
      </div>
      <div>
        <button
          @click="goToEdit(livro.id)"
          class="cursor-pointer flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-950/20 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 active:scale-95"
          title="Editar Livro"
        >
          <svg
            class="h-4.5 w-4.5 text-indigo-400"
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
        </button>
      </div>
    </div>
  </div>
</template>
