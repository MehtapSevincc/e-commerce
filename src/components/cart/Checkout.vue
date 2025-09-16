<template>
  <div class="mt-4 p-4 border-t bg-white">
    <h2 class="text-lg font-semibold mb-2">Checkout</h2>
    <div v-if="cart.items.length > 0">

      <p class="font-bold text-lg mt-2">
        Total Price: ₺{{ cart.finalTotal.toFixed(2) }}
      </p>
    </div>
    <div v-else>
      <p>0.00₺</p>
    </div>
  </div>
</template>
<script setup>

import { useCartStore

 } from '../../stores/cart';
 const cart =useCartStore();
</script>
