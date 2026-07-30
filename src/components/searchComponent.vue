<script setup lang="ts">
import { ref } from 'vue'
import RegisterButton from './registerButton.vue'

withDefaults(
  defineProps<{
    placeholder?: string
    withRegister?: boolean
  }>(),
  {
    placeholder: 'Pesquisar...',
    withRegister: false,
  },
)

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 w-full">
    <div class="relative flex-grow">
      <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        type="text"
        v-model="modelValue"
        :placeholder="placeholder || 'Pesquisar...'"
        class="block w-full rounded-xl border border-slate-800/80 bg-slate-900/40 py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 transition-all duration-200 focus:border-indigo-500/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
    <register-button v-if="withRegister" />
  </div>
</template>
