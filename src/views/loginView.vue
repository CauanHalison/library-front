<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'

const { loginRedirect, registerRedirect } = useAuth()
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <div
        class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>
      <h2 class="mt-4 text-3xl font-extrabold tracking-tight text-white">Acesse o Portal</h2>
      <p class="mt-2 text-sm text-slate-400">Gerencie e explore todo o catálogo literário</p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="relative overflow-hidden rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md px-6 py-8 shadow-xl sm:px-10"
      >
        <div
          class="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-indigo-500/10 blur-xl"
        ></div>
        <div
          class="absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-purple-500/5 blur-xl"
        ></div>

        <div class="space-y-6 relative z-10">
          <p class="text-sm text-slate-300 text-center leading-relaxed">
            Para garantir a segurança dos dados, utilizamos a autenticação por Single Sign-On (SSO)
            integrada.
          </p>

          <div>
            <button
              @click="loginRedirect()"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/10 transition-all duration-200 hover:shadow-indigo-500/20 active:scale-[0.98]"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Fazer Login com SSO
            </button>
          </div>

          <div class="relative flex py-2 items-center">
            <div class="flex-grow border-t border-slate-800/60"></div>
            <span class="flex-shrink mx-4 text-slate-500 text-xs uppercase font-mono"
              >Não tem conta?</span
            >
            <div class="flex-grow border-t border-slate-800/60"></div>
          </div>

          <div>
            <button
              @click="registerRedirect()"
              class="w-full rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-800 hover:border-slate-700 hover:text-white px-4 py-3 text-sm font-semibold text-slate-300 transition-all duration-200 active:scale-[0.98]"
            >
              Criar Conta Local
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
