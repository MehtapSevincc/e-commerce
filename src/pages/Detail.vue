<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>Price: {{ product.numPrice }}</p>
    <p>{{ product.description }}</p>

  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';
import { fetchProducts } from '../stores/product';
const route =useRoute();
const product =ref(null);

onMounted(async ()=>{
  const allProducts =await fetchProducts();
  product.value =allProducts.find(p=>p.id === route.params.id);

});
</script>

