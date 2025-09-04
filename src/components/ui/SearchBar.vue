<template>
    <div class="w-full max-w-md mx-auto">
        <input 
        type="text"
        v-model="query"
        @input="onInput"
        placeholder="Search"
        class="w-full px-4 py-2 mb-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
    </div>
</template>
<script setup>
import {ref} from 'vue'
const query = ref('')
function onInput() {
    const emit = defineEmits(['search'])
    emit('search',query.value)
}

</script>