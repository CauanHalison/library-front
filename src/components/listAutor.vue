<script setup lang="ts">
import type { Autor } from '@/types/autor'
import CardAutor from './cardAutor.vue'

const props = defineProps<{
  autores: Autor[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
    <div v-for="autor in props.autores" :key="autor.id" class="h-full">
      <CardAutor v-bind="autor" />
    </div>
  </div>
</template>
