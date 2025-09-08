<template>
    <div class="cart border-l p-4 w-64">
       <h2 class="text-xl font-bold mb-4">Cart</h2>
       <div v-if="cart.items.length===0" class="text-gray-500" >
        Cart is empty
       </div>

       <div v-else>
       <div v-for="item in cart.items" :key="item.id" class="mb-3 border-b pb-2 flex items-center justify-between">
        <div>
<p class="font-medium">{{ item.name }}</p>
<p>{{ (item.numPrice * item.quantity).toFixed(2) }}₺</p>

</div>
<div class="flex items-center gap-2">
<button @click="cart.decreaseQuantity(item.id)" class="px-2 py-1 bg-gray-300 rounded">-</button>
<div class="px-3 py-1 border rounded text-center min-w-[30px]">{{ item.quantity }}</div>
<button @click="cart.addToCart(item)" class="px-2 py-1 bg-gray-300 rounded">+</button>
</div>
<button @click="cart.removeFromCart(item.id)" class="text-rose-700 text-sm"><i class="fa-solid fa-trash"></i></button>
       </div> 
       </div>
    </div>
</template>
<script setup>
import { useCartStore } from '../stores/cart';
const cart =useCartStore()
</script>