<template>
  <router-link :to="{ name: 'Detail', params: { id: product.id } }" class="block">
    <Card class="h-[150px] flex flex-col justify-between p-4">
<button @click.stop.prevent="toggleFavorite" class="absolute top-2 right-2 text-stone-400 hover:text-rose-800 focus:outline-none"
aria-label="Toggle Favorite">
  <i :class="['fa-heart', isFavorited ? 'fa-solid text-rose-800' : 'fa-regular']"></i>
</button> 
      <div class="flex-grow">    
        <h2 class="text-lg font-semibold mb-1 truncate">{{ product.title }}</h2>
        <p class="text-stone-800 font-bold">{{ product.numPrice.toFixed(2) }}₺</p>
        <h2 class="text-l font-bold truncate">{{ product.name }}</h2>
      </div>  
      <button
        @click.stop.prevent="addToCart"
        class="mt-4 px-4 py-2 bg-stone-800 text-white rounded hover:bg-stone-700 transition">
        Add Cart
      </button>
    </Card>
  </router-link>
</template>
<script setup>
import { computed } from 'vue'
import Card from '../ui/Card.vue'
import { useCartStore } from '../../stores/cart';
import {useFavoritesStore} from '../../stores/favorite'

const props =defineProps({
  product: {
    type: Object,
    required: true
  }
})
const favorites=useFavoritesStore()
const isFavorited= computed(()=>favorites.isFavorite(props.product.id))
function toggleFavorite(){
    favorites.toggleFavorite(props.product)
}
const cart =useCartStore()
function addToCart(){
    const cleanPrice = props.product.numPrice
  cart.addToCart({ ...props.product, numPrice: cleanPrice })
}
</script>

