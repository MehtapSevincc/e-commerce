<template>
    <header class="bg-gray-800 text-white p-4">
         <h1 class="text-xl font-bold ">E-Commerce</h1>
         <SearchBar v-model="searchQuery" />
         <h2>Mehtap Sevinç</h2>
    </header>
</template>
 
<script setup>
import {ref,watch} from 'vue'
import SearchBar from '../ui/SearchBar.vue'
const props =defineProps({
    modelValue:String
})
const emit =defineEmits(['update:modelValue'])
const searchQuery=ref(props.modelValue || '')
watch(()=> props.modelValue,(val)=>{
    searchQuery.value= val || ''
})

watch(searchQuery, (val) => {
  emit('update:modelValue', val)
})

</script>