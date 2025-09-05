<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
  <ProductCard 
  v-for="product in paginatedProducts"
  :key="product.id"
  :product="product" />
  </div>



    <div class="flex justify-center mt-4 gap-2">
    <button 
      @click="changePage(currentPage - 1)" 
      :disabled="currentPage === 1"
      class="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    <button 
      v-for="page in totalPages" 
      :key="page" 
      @click="changePage(page)"
      class="px-3 py-1 border rounded"
      :class="page === currentPage ? 'bg-sky-900 text-white' : ''"
    >
      {{ page }}
    </button>

    <button 
      @click="changePage(currentPage + 1)" 
      :disabled="currentPage === totalPages"
      class="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>


</template>

<script setup>
import {ref,computed, onMounted } from 'vue';
import { fetchProducts } from '../stores/product';
import ProductCard from '../components/product/ProductCard.vue';

const allProducts =ref([])
const currentPage =ref(1)
const perPage =12

onMounted (async () => {
  const data =await fetchProducts()
  console.log('Fetched products:',data)
  allProducts.value = data
})
const paginatedProducts= computed(()=>{
  const start =(currentPage.value-1)*perPage
  const end =start+perPage
  return allProducts.value.slice(start,end)

})
const totalPages =computed(()=>{
  return Math.ceil(allProducts.value.length /perPage) 
})
function changePage(page){
  if (page >=1 && page <= totalPages.value){
    currentPage.value =page

  }
}
</script>
