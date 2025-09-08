<template>
    <div class="brands-filter p-4 border rounded w-64 bg-white">
    <input 
    type="text"
    v-model="search"
    placeholder="search brand..."
    class="w-full mb-3 p-2 border rounded"
    />
    <div class ="brand-list max-h-48 overflow-auto">
        <label
        v-for="brand in filteredBrands"
        :key="brand"
        class="flex items-center gap-2 mb-1 cursor-pointer"
        >
        <input 
        type="checkbox"
        :value="brand"
        v-model="selectedBrands"
        class="form-checkbox"
        />
        {{ brand }}        
    </label>
    <p v-if="filteredBrands.length === 0" class="text-gray-500 text-sm">
        Brand not found
    </p>
    </div>
    </div>
</template>

<script setup>
import {ref,computed,watch} from 'vue'
const emit =defineEmits(['update:brands'])
const brands =['Apple','Samsung','Ford','Honda','Asus','Dell','Mercedes','Toyota']
const search =ref('')
const selectedBrands =ref([])

watch(selectedBrands, (newVal) => {
  emit('update:brands', newVal)
})


const filteredBrands = computed(()=> {
    if(!search.value) return brands
    return brands.filter((brand) =>
    brand.toLowerCase().includes(search.value.toLowerCase())
)
})
watch(selectedBrands,(newVal)=>{
    emit('update:selected',newVal)
})
</script>
