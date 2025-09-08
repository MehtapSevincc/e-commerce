
<template>
    <div class=" mt-4 p-4 border-t  bg-white">
        <h1 class="text-2xl font-bold text-center mb-6">Favorites</h1>
        <div v-if="favorites.length>0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
        <ProductCard v-for="product in favorites"
        :key="product.id"
        :product="product"/>
</div>
  <div v-else class="text-center text-stone-800">
      No favorite products yet
    </div>

    </div>  
</template>

<script setup>
import {computed} from 'vue'
import { useFavoritesStore } from '../../stores/favorite'
import ProductCard from '../product/ProductCard.vue';

const favoriteStore = useFavoritesStore()
const favorites = computed(() => favoriteStore.favorites)
</script>