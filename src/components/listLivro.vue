<script setup lang="ts">
import CardLivros from '@/components/cardLivros.vue'
import type { Livro } from '@/types/livro'

const props = defineProps<{
  livros: Livro[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
    <div v-for="livro in props.livros" :key="livro.id" class="h-full">
      <CardLivros v-bind="livro" />
    </div>
  </div>
</template>
