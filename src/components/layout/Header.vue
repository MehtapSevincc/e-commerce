<template>
  <header class="bg-stone-500 text-white p-4 flex items-center justify-center">
    <h1 class="text-xl font-bold">E-Commerce</h1>
    <SearchBar v-model="searchQuery" />
    <h2>
      <span class="bg-stone-800 px-2 py-0.5 rounded text-sm font-semibold mr-6">
        {{ formattedFinalTotal }}₺
      </span>
      Mehtap Sevinç
    </h2>
  </header>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import SearchBar from "../ui/SearchBar.vue";
import { useCartStore } from "../../stores/cart";
const cart = useCartStore();

const emit = defineEmits(["update:modelValue"]);
const searchQuery = ref("");
const props =defineProps({
  modelValue:String,
});

watch(
  () => props.modelValue,
  (val) => {
    searchQuery.value = val || "";
  }
);

watch(searchQuery, (val) => {
  emit("update:modelValue", val);
});
const formattedFinalTotal = computed(() => {
  return cart.finalTotal.toFixed(2);
});
</script>
