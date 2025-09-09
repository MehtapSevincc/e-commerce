<template>
  <header class="bg-stone-500 text-white p-4 flex items-center justify-center">
    <h1 class="text-xl font-bold">E-Commerce</h1>
    <SearchBar v-model="searchQuery" />
    <h2>
      <span class="bg-stone-800 px-2 py-0.5 rounded text-sm font-semibold mr-6">
        {{ formattedTotalPrice }}₺
      </span>
      Mehtap Sevinç
    </h2>
  </header>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import SearchBar from "../ui/SearchBar.vue";
const props = defineProps({
  modelValue: String,
  totalPrice: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["update:modelValue"]);
const searchQuery = ref(props.modelValue || "");
watch(
  () => props.modelValue,
  (val) => {
    searchQuery.value = val || "";
  }
);

watch(searchQuery, (val) => {
  emit("update:modelValue", val);
});
const formattedTotalPrice = computed(() => {
  return props.totalPrice.toFixed(2);
});
</script>
