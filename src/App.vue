<template>
  <div>
    <router-view :search-query="searchQuery" />
  </div>
</template>
<script setup>
import { ref } from "vue";
const searchQuery = ref("");
</script>
