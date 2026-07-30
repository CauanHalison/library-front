<script setup lang="ts">
import router from '@/router'
import registerService from '@/services/registerService'
import type { RegisterPayload } from '@/types/auth'
import { ref } from 'vue'
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()

const registerPayload = ref<RegisterPayload>({
  login: '',
  senha: '',
  email: '',
  roles: ['OPERADOR'],
})

const isSubmitting = ref(false)
const errorMessage = ref('')

async function register() {
  isSubmitting.value = true
  errorMessage.value = ''
  try {
    const data = await registerService.registerUser(registerPayload.value)
    console.log(data)
    if (data.status === 201) {
      alertStore.showAlert({
        title: 'Conta Criada!',
        message: `Sua conta para o usuário "${registerPayload.value.login}" foi criada com sucesso.`,
        type: 'success',
      })
      router.push('/login')
    }
  } catch (error: any) {
    console.error(error)
    errorMessage.value =
      error.response?.data?.message || 'Erro ao registrar usuário. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <div
        class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      </div>
      <h2 class="mt-4 text-3xl font-extrabold tracking-tight text-white">Criar Conta</h2>
      <p class="mt-2 text-sm text-slate-400">
        Cadastre-se para acessar as funcionalidades da biblioteca
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="relative overflow-hidden rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md px-6 py-8 shadow-xl sm:px-10"
      >
        <div
          class="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-purple-500/10 blur-xl"
        ></div>
        <div
          class="absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-indigo-500/5 blur-xl"
        ></div>

        <form @submit.prevent="register" class="space-y-5 relative z-10">
          <div
            v-if="errorMessage"
            class="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400"
          >
            {{ errorMessage }}
          </div>

          <div class="space-y-1.5">
            <label for="login" class="text-xs font-semibold uppercase tracking-wider text-slate-400"
              >Nome de Usuário</label
            >
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                id="login"
                type="text"
                required
                placeholder="Ex: joaosilva"
                v-model="registerPayload.login"
                class="block w-full rounded-xl border border-slate-800/80 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-500 transition-all duration-200 focus:border-purple-500/80 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label for="email" class="text-xs font-semibold uppercase tracking-wider text-slate-400"
              >E-mail</label
            >
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                required
                placeholder="Ex: joao@exemplo.com"
                v-model="registerPayload.email"
                class="block w-full rounded-xl border border-slate-800/80 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-500 transition-all duration-200 focus:border-purple-500/80 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label
              for="password"
              class="text-xs font-semibold uppercase tracking-wider text-slate-400"
              >Senha</label
            >
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                id="password"
                type="password"
                required
                placeholder="Sua senha secreta"
                v-model="registerPayload.senha"
                class="block w-full rounded-xl border border-slate-800/80 bg-slate-950/60 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-500 transition-all duration-200 focus:border-purple-500/80 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-purple-500/10 transition-all duration-200 hover:shadow-purple-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                v-if="isSubmitting"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
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
              {{ isSubmitting ? 'Cadastrando...' : 'Criar Conta' }}
            </button>
          </div>

          <div class="text-center pt-2">
            <RouterLink
              to="/login"
              class="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Já possui uma conta? Faça login
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
