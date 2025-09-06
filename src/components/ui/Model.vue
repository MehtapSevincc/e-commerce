<template>
 
<div 
class="models p-4 border rounded w-64 transition-opacity"
 :class="{ 'opacity-50 pointer-events-none': !hasBrand }"
>

    <input v-model="search"
    type="text"
    placeholder="Search model..."
    :disabled="!hasBrand"
    class="w-full mb-3 p-2 border rounded"
    :class="{'bg-gray-100 text-gray-500 cursor-not-allowed':!hasBrand,'bg-white':hasBrand}"
 />
 <div v-if="hasBrand" class="model-list max-h-48 overflow-auto">
    <label 
    v-for="model in filteredModels"
    :key="model"
    class="flex items-center gap-2 mb-1 cursor-pointer">

        <input 
            type="checkbox"
            :value="model"
            v-model="localSelectedModels"
            class="form-checkbox" />
            {{ model }}
        </label>

 <p v-if="filteredModels.length ===0" class="text-gray-500 text-sm">
            Model not found!
        </p>
        </div>

        <div v-else class="text-gray-500 text-sm">
      You haven't selected any brands yet!
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
    selectedModels:{
        type: Array,
        required:true,
    }
});
const emit=defineEmits(['update:models'])

const search =ref('')


const hasBrand=computed(()=>props.selectedBrands.length>0)

const availableModels =computed(()=> {
    if(!hasBrand.value) return []
    const modelsSet= new Set();

    props.allProducts.forEach((product)=>{
        if(props.selectedBrands.includes(product.brand)) {

        modelsSet.add(product.model);
            
        }
    })
    return[...modelsSet]
})

const filteredModels =computed (()=>{
    return availableModels.value.filter((model)=>
    model.toLowerCase().includes(search.value.toLocaleLowerCase())
)
})
const localSelectedModels =ref([...props.selectedModels]);
watch (()=> props.selectedModels,(newVal)=> {
    localSelectedModels.value=[...newVal];
})
watch(localSelectedModels,(newVal)=>{
    emit('update:models',newVal)
})
























</script>