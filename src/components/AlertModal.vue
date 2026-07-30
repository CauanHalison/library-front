<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()

function handleClose() {
  alertStore.close()
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="alertStore.isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      @click.self="handleClose"
    >
      <Transition name="scale">
        <div
          v-if="alertStore.isOpen"
          class="relative w-full max-w-md overflow-hidden rounded-2xl border bg-slate-900/95 p-6 text-left shadow-2xl transition-all"
          :class="{
            'border-emerald-500/20 shadow-emerald-950/20': alertStore.type === 'success',
            'border-red-500/20 shadow-red-950/20': alertStore.type === 'error',
            'border-indigo-500/20 shadow-indigo-950/20': alertStore.type === 'info',
          }"
        >
          <div
            class="absolute top-0 left-0 right-0 h-1"
            :class="{
              'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500':
                alertStore.type === 'success',
              'bg-gradient-to-r from-red-500 via-pink-500 to-red-500': alertStore.type === 'error',
              'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500':
                alertStore.type === 'info',
            }"
          ></div>

          <button
            @click="handleClose"
            class="absolute top-4 right-4 rounded-lg p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="flex flex-col items-center text-center mt-2">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl border mb-4 animate-pulse"
              :class="{
                'bg-emerald-500/10 border-emerald-500/20 text-emerald-400':
                  alertStore.type === 'success',
                'bg-red-500/10 border-red-500/20 text-red-400': alertStore.type === 'error',
                'bg-indigo-500/10 border-indigo-500/20 text-indigo-400': alertStore.type === 'info',
              }"
            >
              <svg
                v-if="alertStore.type === 'success'"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <svg
                v-else-if="alertStore.type === 'error'"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <svg
                v-else
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h3 class="text-xl font-bold text-white tracking-tight px-2">
              {{ alertStore.title }}
            </h3>

            <p class="mt-2 text-sm text-slate-300 leading-relaxed px-1">
              {{ alertStore.message }}
            </p>
          </div>

          <div class="mt-6">
            <button
              @click="handleClose"
              class="w-full px-5 py-3 rounded-xl text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-center"
              :class="{
                'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-950/20 hover:shadow-emerald-500/10':
                  alertStore.type === 'success',
                'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 shadow-red-950/20 hover:shadow-red-500/10':
                  alertStore.type === 'error',
                'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-950/20 hover:shadow-indigo-500/10':
                  alertStore.type === 'info',
              }"
            >
              Entendido
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-leave-active {
  transition: all 0.2s ease-in;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(8px);
}
</style>
