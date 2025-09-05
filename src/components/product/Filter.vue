<template>
    <div class="flex flex-col gap-2">
        <label class="flex items-center gap-2">
            <input type="radio"  name="sort" value="price-asc" v-model="localSortOption" />
            Price:Low to High
        </label>
        <label>
            <input type="radio" name="sort" value="price-desc" v-model="localSortOption" />
            Price:High to Low
        </label>
         <label class="flex items-center gap-2">
            <input type="radio"  name="sort" value="newest" v-model="localSortOption" />
           New to Old
        </label>
         <label class="flex items-center gap-2">
            <input type="radio" name="sort" value="oldest" v-model="localSortOption" />
            Old to New
        </label>
    </div>
</template>

<script setup>
import { defineEmits,ref,watch } from 'vue';
const emit =defineEmits(['update:sort']);
const localSortOption = ref('');
watch (localSortOption,(newVal)=> {
    emit('update:sort',newVal)
});
</script>