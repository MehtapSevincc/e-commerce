<template>
  <div class="min-h-screen bg-stone-200 py-8 px-4">
    <div v-if="product" class="text-center mb-6">
      <h1 class="text-2xl font-bold mb-2 text-center">{{ product.name }}</h1>
      <p class="text-lg text-stone-700 font-semibold mb-4">
        {{ product.numPrice }} ₺
      </p>
    </div>
    <div v-if="product">
      <p class="text-stone-600 text-center max-w-prose mx-auto">
        {{ product.description }}
      </p>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchProducts } from "../stores/product";
const route = useRoute();
const product = ref(null);

onMounted(async () => {
  const allProducts = await fetchProducts();
  product.value = allProducts.find((p) => p.id === route.params.id);
});
</script>
