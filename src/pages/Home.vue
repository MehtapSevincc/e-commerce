<template>
  <div class="flex">
      <aside class="w-1/4 p-4 border-r">
<Filter @update:sort="handleSearch"/>
</aside>
    <main class ="w-3/4">
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

</main>
  </div>
</template>

<script setup>
import {ref,computed, onMounted } from 'vue';
import { fetchProducts } from '../stores/product';
import ProductCard from '../components/product/ProductCard.vue';
import Filter from '../components/product/Filter.vue';

const allProducts =ref([]);
const currentPage =ref(1);
const perPage =12;
const sortOption =ref('');
function handleSearch(val){
  sortOption.value =val;
  currentPage.value =1;
}

onMounted (async () => {
  const data =await fetchProducts()
    console.log('type of numPrice:', typeof data[0]?.numPrice);
  allProducts.value = data
})
const sortedProducts =computed (()=>{
 const productsCopy = allProducts.value.slice();
 if(sortOption.value === 'price-asc') {
  return productsCopy.sort((a,b)=>a.numPrice-b.numPrice);
 }
  else if (sortOption.value === 'price-desc') {
    return productsCopy.sort((a, b) => b.numPrice - a.numPrice);
  }
   else if (sortOption.value === 'newest') {
    return productsCopy.sort((a, b) =>new Date(b.createdAt) - new Date(a.createdAt));
  }
   else if (sortOption.value === 'oldest') {
    return productsCopy.sort((a, b) =>new Date(a.createdAt) - new Date(b.createdAt));
  }
  return productsCopy;

})


const paginatedProducts= computed(()=>{
  const start =(currentPage.value-1)*perPage
  const end =start+perPage
  return sortedProducts.value.slice(start,end)

})
const totalPages =computed(()=>{
  return Math.ceil(sortedProducts.value.length /perPage) 
})
function changePage(page){
  if (page >=1 && page <= totalPages.value){
    currentPage.value =page

  }
}
</script>
