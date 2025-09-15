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
      <div class="text-center">
        <button 
        @click="AddtoCart"
        class="bg-stone-800 text-white px-4 py-2 mt-5 rounded hover:bg-stone-700 transition">
         Add to Cart
      </button>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute,useRouter } from "vue-router";
import { fetchProductById } from "../stores/product";
import { useCartStore } from "../stores/cart";

const router =useRouter();
const route = useRoute();
const product = ref(null);
const cartStore =useCartStore();

onMounted(async () => {
  const id =route.params.id;
  product.value = await fetchProductById(id);   
});

function AddtoCart(){
  if(product.value){
    cartStore.addToCart(product.value);
    router.push("/#cart");
  }

}
</script>
