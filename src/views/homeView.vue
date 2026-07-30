<script setup lang="ts">
import { useAutor } from '@/composables/useAutor'
import { useLivros } from '@/composables/useLivros'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { totalAutores, getTotalAutores } = useAutor()
const { totalLivros, getTotalLivros } = useLivros()

function openLivrosView() {
  router.push('/livros')
}

function openAutoresView() {
  router.push('/autores')
}

onMounted(() => {
  getTotalAutores()
  getTotalLivros()
})
</script>

<template>
  <div class="space-y-12 py-4">
    <section
      class="relative overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800/80 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md"
    >
      <div
        class="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl"
      ></div>
      <div
        class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-500/10 blur-2xl"
      ></div>

      <div class="max-w-2xl space-y-4 relative z-10">
        <span
          class="inline-flex items-center rounded-full bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20"
        >
          Gerenciamento inteligente de acervos
        </span>
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
        >
          Sua Biblioteca Digital, <br class="hidden sm:inline" />
          <span
            class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Inteligente &amp; Elegante
          </span>
        </h1>
        <p class="text-base text-slate-400 leading-relaxed max-w-lg">
          Explore um acervo digital completo com obras literárias diversas e perfis detalhados dos
          maiores autores literários, tudo integrado em uma interface moderna.
        </p>

        <div class="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
          <button @click="openLivrosView" class="btn-primary">Explorar Livros</button>
          <button
            @click="openAutoresView"
            class="rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5"
          >
            Ver Autores
          </button>
        </div>
      </div>

      <div
        class="relative w-full max-w-[280px] aspect-square flex items-center justify-center bg-slate-950/40 border border-slate-900 rounded-2xl"
      >
        <div
          class="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 rounded-2xl"
        ></div>
        <div class="relative space-y-3 w-4/5">
          <div
            class="h-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-md border border-indigo-500/20 shadow-sm flex items-center px-3 justify-between"
          >
            <div class="w-12 h-1.5 bg-indigo-400/40 rounded-full"></div>
            <div class="w-2 h-2 rounded-full bg-indigo-400/60"></div>
          </div>
          <div
            class="h-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-md border border-purple-500/20 shadow-sm flex items-center px-3 justify-between ml-2"
          >
            <div class="w-16 h-1.5 bg-purple-400/40 rounded-full"></div>
            <div class="w-2 h-2 rounded-full bg-purple-400/60"></div>
          </div>
          <div
            class="h-6 bg-gradient-to-r from-pink-500/20 to-indigo-500/20 rounded-md border border-pink-500/20 shadow-sm flex items-center px-3 justify-between -ml-1"
          >
            <div class="w-14 h-1.5 bg-pink-400/40 rounded-full"></div>
            <div class="w-2 h-2 rounded-full bg-pink-400/60"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-2 gap-4 md:grid-cols-3">
      <div
        class="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 text-center transition-all duration-300 hover:border-slate-800"
      >
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Livros</p>
        <p class="mt-2 text-3xl font-extrabold text-white">{{ totalLivros }}</p>
        <span
          class="mt-1.5 inline-block text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full"
          >+12% este mês</span
        >
      </div>
      <div
        class="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 text-center transition-all duration-300 hover:border-slate-800"
      >
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Autores Cadastrados
        </p>
        <p class="mt-2 text-3xl font-extrabold text-white">{{ totalAutores }}</p>
        <span
          class="mt-1.5 inline-block text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full"
          >+4 novos</span
        >
      </div>
      <div
        class="rounded-2xl border border-slate-900 bg-slate-900/30 p-5 text-center transition-all duration-300 hover:border-slate-800"
      >
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Gêneros Diferentes
        </p>
        <p class="mt-2 text-3xl font-extrabold text-white">7</p>
        <span
          class="mt-1.5 inline-block text-[10px] text-slate-400 font-medium bg-slate-800 px-2 py-0.5 rounded-full"
          >Atualizado</span
        >
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        @click="openLivrosView"
        class="group cursor-pointer rounded-2xl bg-slate-900/40 border border-slate-800/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-900/60 hover:-translate-y-1"
      >
        <div class="flex items-center gap-4">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
              Explorar Catálogo de Livros
            </h3>
            <p class="text-sm text-slate-400 mt-1">
              Veja todos os livros catalogados no sistema, seus detalhes, valores e autores.
            </p>
          </div>
        </div>
      </div>

      <div
        @click="openAutoresView"
        class="group cursor-pointer rounded-2xl bg-slate-900/40 border border-slate-800/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-slate-900/60 hover:-translate-y-1"
      >
        <div class="flex items-center gap-4">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
              Pesquisar Autores Registrados
            </h3>
            <p class="text-sm text-slate-400 mt-1">
              Conheça mais sobre os escritores cadastrados, suas nacionalidades e datas de
              nascimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
