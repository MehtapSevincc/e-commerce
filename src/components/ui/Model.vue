<template>
    <div 
    class="models p-4 border rounded w-64 transition-opacity"
    :class="{'opacity-50 pointer-events-none':selectedBrands.length===0}"
    >
    <div v-if="selectedBrands.length ===0" class="text-gray-500 text-sm">
        You haven't selected brands yet!
    </div>
    <div v-else>
        <input 
        v-model="search"
        type="text"
        placeholder="search model..."
        class="w-full mb-3 p-2 border rounded" />

        <div class="model-list max-h-48 overflow-auto">
            <label 
            v-for="model in filteredModels"
            :key="model"
            class="flex items-center gap-2 mb-1 cursor-pointer"
            >
            <input 
            type="checkbox"
            :value="model"
            v-model="selectedModels"
            class="form-checkbox" />
            {{ model }}
        </label>
        <p v-if="filteredModels.length ===0" class="text-gray-500 text-sm">
            Model not found!
        </p>
        </div>
    </div>
    </div>
</template>

<script setup>
import {ref,computed,watch} from 'vue'

const props=defineProps({
    selectedBrands:{
        type:Array,
        required: true,
    },
    allProducts: {
        type:Array,
        required:true,
    },
})
const emit=defineEmits(['updatee:models'])

const search =ref('')
const selectedModels = ref([])
const availableModels =computed(()=> {
    if(props.selectedBrands.length===0) return []
    const modelsSet= new Set()
    props.allProducts.forEach((product)=>{
        if(props.selectedBrands.includes(product.brand)) {
            modelsSet.add(product.name)
        }
    })
    return[...modelsSet]
})

const filteredModels =computed (()=>{
    return availableModels.value.filter((model)=>
    model.toLowerCase().includes(search.value.toLocaleLowerCase())
)
})
watch(selectedModels,(newVal)=>{
    emit('updatee:models',newVal)
})
























</script>