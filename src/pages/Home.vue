<template>
  <Header
    v-model="searchQuery"
    @update:modelValue="handleSearchQuery"
    :totalPrice="totalPrice"
  />
  <div class="flex bg-stone-200">
    <aside class="w-1/4 p-4 border-r">
      <h2>Sort by</h2>
      <Filter @update:sort="handleSearch" />
      <h2>Brands</h2>
      <Brands @update:brands="handleBrandFilter" />
      <h2>Models</h2>
      <Model
        :selectedBrands="selectedBrands"
        :allProducts="allProducts"
        :selectedModels="selectedModels" 
        @update:models="updateModels "
      />
    </aside>
    <main class="w-2/4">
      <div class=" p-4">

    <div v-if="filteredProducts.length===0" class="text-stone-800 text-lg font-semibold text-center py-10">    
     Product not found
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
        />
      </div>
      </div>

      <div v-if="filteredProducts.length > 0" class="flex justify-center mt-4 gap-2" >
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          <
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          class="px-3 py-1 border rounded"
          :class="page === currentPage ? 'bg-stone-800 text-white' : ''"
        >
          {{ page }}
        </button>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          >
        </button>
      </div>
    </main>
    <aside class="p-4 border-l">
      <Cart />
      <Checkout :cart-items="cartItems" />
      <Favorites />
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchProducts } from "../stores/product";
import ProductCard from "../components/product/ProductCard.vue";
import Filter from "../components/product/Filter.vue";
import Brands from "../components/product/Brands.vue";
import Model from "../components/ui/Model.vue";
import { fakeDatas } from "../data/data";
import Cart from "../styles/Cart.vue";
import Checkout from "../components/cart/Checkout.vue";
import { useCartStore } from "../stores/cart";
import Header from "../components/layout/Header.vue";
import Favorites from "../components/ui/Favorites.vue";


const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() => {
  return cartItems.value.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
});

const searchQuery = ref("");

const allProducts = ref([]);
const currentPage = ref(1);
const perPage = 9;

const sortOption = ref("");
const selectedBrands = ref([]);

const selectedModels = ref([]);
function updateModels(val) {
  
  if (Array.isArray(val)) {
    selectedModels.value = val;
  } else if (val == null) {
    selectedModels.value = [];
  } else {
    selectedModels.value = [val];
  }
  currentPage.value = 1;
}

function handleSearchQuery(val) {
  searchQuery.value = val.toLowerCase();
  currentPage.value = 1;
}

function handleSearch(val) {
  sortOption.value = val;
  currentPage.value = 1;
}
function handleBrandFilter(val) {
  selectedBrands.value = val;
}

onMounted(async () => {   
  const data = await fetchProducts(); 
  const combined = [...data, ...fakeDatas].map((product) => ({   
    ...product,
    numPrice: parseFloat(product.price) || product.numPrice || 0,
  }));
  allProducts.value = combined;
});

const filteredProducts = computed(() => {
  let products = [...allProducts.value];

  if (selectedBrands.value.length > 0) {
    products = products.filter((product) =>
      selectedBrands.value.includes(product.brand)
    );
  }
  if (selectedModels.value.length > 0) {
    products = products.filter((product) =>
      selectedModels.value.some(
        (selectedModel)=>
        selectedModel.trim().toLowerCase()===product.model?.trim().toLowerCase()
      )
    );
  }
  if (searchQuery.value) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLocaleLowerCase())
    );
  }

  if (sortOption.value === "price-asc") {
    return products.sort((a, b) => a.numPrice - b.numPrice);
  } else if (sortOption.value === "price-desc") {
    return products.sort((a, b) => b.numPrice - a.numPrice);
  } else if (sortOption.value === "newest") {
    return products.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortOption.value === "oldest") {
    return products.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }
  return products;
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = start + perPage;
  return filteredProducts.value.slice(start, end);
});
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / perPage);
});
function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>
