
<template>
  <Card>
    <img
      :src="product.image"
      alt="Product Image"
      class=""
    />
    <h2 class="text-lg font-semibold mb-1">{{ product.title }}</h2>
    <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ product.description }}</p>
    <p class="text-slate-900 font-bold">{{ product.price }}₺</p>
     <h2 class="text-xl font-bold">{{ product.name }}</h2>
    <p class="text-sm text-gray-600">{{ product.brand }}</p>
  </Card>
</template>

<script setup>
import Card from '../ui/Card.vue'

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

