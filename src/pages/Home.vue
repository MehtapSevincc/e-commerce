<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold"></h1>
  </div>
</template>

<script setup>
import {ref, onMounted } from 'vue';
import { fetchProducts } from '../stores/product';
const products =ref([])
onMounted (async () => {
  products.value = await fetchProducts()
})
</script>
