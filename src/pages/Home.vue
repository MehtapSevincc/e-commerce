<template>
  <div class="flex">
      <aside class="w-1/4 p-4 border-r">
<Filter @update:sort="handleSearch"/>
<Brands @update:brands="handleBrandFilter" />
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
import Brands from '../components/product/Brands.vue';

const allProducts =ref([]);
const currentPage =ref(1);
const perPage =12;

const sortOption =ref('');
const selectedBrands=ref([]);

function handleSearch(val){
  sortOption.value =val;
  currentPage.value =1;
}
function handleBrandFilter(val){
  selectedBrands.value=val
}

onMounted (async () => {
  const data =await fetchProducts()
  allProducts.value = data
})

const filteredProducts =computed (()=>{
 let products =[...allProducts.value];

 if(selectedBrands.value.length >0){
  products= products.filter((product) =>
  selectedBrands.value.includes(product.brand)
);
 }

 if(sortOption.value === 'price-asc') {
  return products.sort((a,b)=>a.numPrice-b.numPrice);
 }
  else if (sortOption.value === 'price-desc') {
    return products.sort((a, b) => b.numPrice - a.numPrice);
  }
   else if (sortOption.value === 'newest') {
    return products.sort((a, b) =>new Date(b.createdAt) - new Date(a.createdAt));
  }
   else if (sortOption.value === 'oldest') {
    return products.sort((a, b) =>new Date(a.createdAt) - new Date(b.createdAt));
  }
  return products;

})


const paginatedProducts= computed(()=>{
  const start =(currentPage.value-1)*perPage
  const end =start+perPage
  return filteredProducts.value.slice(start,end)

})
const totalPages =computed(()=>{
  return Math.ceil(filteredProducts.value.length /perPage) 
})
function changePage(page){
  if (page >=1 && page <= totalPages.value){
    currentPage.value =page

  }
}
</script>
