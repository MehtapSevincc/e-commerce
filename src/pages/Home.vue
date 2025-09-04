<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
  <ProductCard 
  v-for="product in products"
  :key="product.id"
  :product="product" />
  </div>
</template>

<script setup>
import {ref, onMounted } from 'vue';
import { fetchProducts } from '../stores/product';
import ProductCard from '../components/product/ProductCard.vue';

const products =ref([])
onMounted (async () => {
  products.value = await fetchProducts()
})
</script>
