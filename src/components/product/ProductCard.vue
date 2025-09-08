<template>
     <router-link :to="{ name: 'Detail', params: { id: product.id } }" class="block">
   <Card>
   
    <h2 class="text-lg font-semibold mb-1">{{ product.title }}</h2>

    <p class="text-slate-900 font-bold">{{ product.numPrice.toFixed(2) }}₺</p>
     <h2 class="text-xl font-bold">{{ product.name }}</h2>
   <button
        @click.stop.prevent="addToCart"
        class="mt-2 px-4 py-2 bg-sky-700 text-white rounded hover:bg-sky-800 transition"
      >
        Add Cart
      </button>

  </Card>
  </router-link>
</template>

<script setup>
import Card from '../ui/Card.vue'
import { useCartStore } from '../../stores/cart';

const props =defineProps({
  product: {
    type: Object,
    required: true
  }
})
const cart =useCartStore()
function addToCart(){
    const cleanPrice = props.product.numPrice
  cart.addToCart({ ...props.product, numPrice: cleanPrice })
}
</script>

