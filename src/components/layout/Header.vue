<template>
    <header class="bg-gray-800 text-white p-4">
         <h1 class="text-xl font-bold ">E-Commerce</h1>
         <SearchBar @search="handleSearch" />
         <h2>Mehtap Sevinç</h2>
    </header>
</template>

<script setup>
import SearchBar from '../ui/SearchBar.vue';

function handleSearch(query) {
    console.log("Search query from Header:",query)
}

</script>