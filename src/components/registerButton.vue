<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const pageName: string = route.name as string

const { getAuthorities } = useAuth()

const registerText = {
  autores: 'autor',
  livros: 'livro',
}

const buttonText = computed<string | undefined>(() => {
  return registerText[pageName as keyof typeof registerText]
})

const checkAuthorities = computed(() => {
  const authorites = getAuthorities()

  return authorites.find((authoritie) => authoritie['role' as keyof typeof authoritie] == 'GERENTE')
})

function goToRegisterPage() {
  router.push(`/cadastro-${buttonText.value}`)
}
</script>

<template>
  <div v-if="checkAuthorities">
    <button @click="goToRegisterPage()" class="btn-primary">cadastrar {{ buttonText }}</button>
  </div>
</template>
