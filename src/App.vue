<template> 
   <div>
 <Header v-model="searchQuery" />
    <router-view :search-query="searchQuery" />
  </div>
  
</template>

<script setup>
import {ref} from 'vue'
import Header from './components/layout/Header.vue';

const searchQuery = ref('');
</script>
