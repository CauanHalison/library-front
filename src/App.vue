<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAuth } from '@/composables/useAuth'
import AlertModal from '@/components/AlertModal.vue'

const authStore = useAuthStore()
const { loginRedirect } = useAuth()
const isMobileMenuOpen = ref(false)

function handleLogout() {
  authStore.logout()
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header
      class="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-3">
            <RouterLink to="/" class="flex items-center gap-2 group">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105"
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
              <span
                class="text-xl font-bold tracking-tight text-white bg-clip-text group-hover:text-indigo-400 transition-colors duration-200"
              >
                Biblio<span class="text-indigo-400">tech</span>
              </span>
            </RouterLink>
          </div>

          <nav class="hidden md:flex items-center gap-1">
            <RouterLink
              to="/"
              class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-800/40"
              active-class="text-indigo-400 bg-indigo-500/10 font-semibold border border-indigo-500/20"
            >
              Início
            </RouterLink>
            <RouterLink
              to="/livros"
              class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-800/40"
              active-class="text-indigo-400 bg-indigo-500/10 font-semibold border border-indigo-500/20"
            >
              Livros
            </RouterLink>
            <RouterLink
              to="/autores"
              class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-800/40"
              active-class="text-indigo-400 bg-indigo-500/10 font-semibold border border-indigo-500/20"
            >
              Autores
            </RouterLink>
          </nav>

          <div class="hidden md:flex items-center gap-3">
            <template v-if="authStore.isAuthenticated">
              <span
                class="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
              >
                Conectado
              </span>
              <button
                @click="handleLogout"
                class="rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200"
              >
                Sair
              </button>
            </template>
            <template v-else>
              <button
                @click="loginRedirect()"
                class="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4.5 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/15 hover:shadow-indigo-500/25 transition-all duration-200"
              >
                Entrar
              </button>
              <RouterLink
                to="/register"
                class="rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-700 px-4.5 py-2 text-sm font-semibold text-slate-200 transition-all duration-200"
              >
                Registrar
              </RouterLink>
            </template>
          </div>

          <div class="flex md:hidden">
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white border border-slate-800"
            >
              <span class="sr-only">Menu principal</span>
              <svg
                v-if="!isMobileMenuOpen"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                v-else
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        v-show="isMobileMenuOpen"
        class="md:hidden border-t border-slate-900 bg-slate-950/95 px-4 pt-2 pb-4 space-y-1"
      >
        <RouterLink
          to="/"
          @click="isMobileMenuOpen = false"
          class="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
          active-class="bg-indigo-500/10 text-indigo-400"
        >
          Início
        </RouterLink>
        <RouterLink
          to="/livros"
          @click="isMobileMenuOpen = false"
          class="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
          active-class="bg-indigo-500/10 text-indigo-400"
        >
          Livros
        </RouterLink>
        <RouterLink
          to="/autores"
          @click="isMobileMenuOpen = false"
          class="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
          active-class="bg-indigo-500/10 text-indigo-400"
        >
          Autores
        </RouterLink>

        <div class="pt-4 border-t border-slate-900 flex flex-col gap-2">
          <template v-if="authStore.isAuthenticated">
            <span
              class="text-center text-xs text-slate-500 bg-slate-900 px-3 py-2 rounded-lg border border-slate-900"
            >
              Autenticado
            </span>
            <button
              @click="(handleLogout(), (isMobileMenuOpen = false))"
              class="w-full text-center rounded-lg border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 text-sm font-semibold text-red-400 transition-colors"
            >
              Sair
            </button>
          </template>
          <template v-else>
            <button
              @click="(loginRedirect(), (isMobileMenuOpen = false))"
              class="w-full text-center rounded-lg bg-indigo-500 hover:bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md transition-colors"
            >
              Entrar
            </button>
            <RouterLink
              to="/register"
              @click="isMobileMenuOpen = false"
              class="block w-full text-center rounded-lg border border-slate-800 bg-slate-900 px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Registrar
            </RouterLink>
          </template>
        </div>
      </div>
    </header>

    <main
      class="flex-grow mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col justify-start"
    >
      <RouterView />
    </main>

    <footer
      class="border-t border-slate-900/60 bg-slate-950/40 py-6 text-center text-xs text-slate-500"
    >
      <div
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div>&copy; 2026 Bibliotech. Todos os direitos reservados.</div>
        <div class="flex items-center gap-4">
          <RouterLink to="/" class="hover:text-slate-300 transition-colors">Termos</RouterLink>
          <span>&middot;</span>
          <RouterLink to="/" class="hover:text-slate-300 transition-colors">Privacidade</RouterLink>
          <span>&middot;</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener"
            class="hover:text-indigo-400 transition-colors"
            >GitHub</a
          >
        </div>
      </div>
    </footer>

    <AlertModal />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
