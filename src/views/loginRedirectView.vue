<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'
import { onMounted } from 'vue'

const { processCallback } = useAuth()

onMounted(() => {
  processCallback()
})
</script>

<template>
  <div class="flex flex-grow flex-col items-center justify-center py-16 text-center">
    <div class="relative flex items-center justify-center mb-6">
      <div class="absolute h-16 w-16 rounded-full bg-indigo-500/20 blur-lg animate-pulse"></div>

      <svg class="animate-spin h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="3"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>

    <h2 class="text-xl font-bold text-white tracking-tight">Autenticando</h2>
    <p class="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
      Aguarde um momento enquanto validamos suas credenciais e estabelecemos uma conexão segura.
    </p>
  </div>
</template>
