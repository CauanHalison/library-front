import { defineStore } from 'pinia'
import { ref } from 'vue'

export type AlertType = 'success' | 'error' | 'info'

export const useAlertStore = defineStore('alert', () => {
  const isOpen = ref(false)
  const title = ref('')
  const message = ref('')
  const type = ref<AlertType>('info')

  const showAlert = (options: { title: string; message: string; type?: AlertType }) => {
    title.value = options.title
    message.value = options.message
    type.value = options.type || 'info'
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    title,
    message,
    type,
    showAlert,
    close,
  }
})
