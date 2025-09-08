<template>
    <div class ="mt-4 p-4 border-t">
        <h2 class ="text-lg font-semibold mb-2">Checkout</h2>
        <div v-if="cartItems.length >0">
            <p class="text-md">Total Price:<span class="font-bold">{{ formattedTotal }}</span></p>
        </div>
        <div v-else>
            <p>0₺</p>
        </div>
    </div>
</template>
<script setup>
import {computed} from 'vue'
const props =defineProps({
    cartItems:{
        type:Array,
        required:true
    }
})
const total =computed(()=>{
    return props.cartItems.reduce((sum,item)=>{
        return sum + (item.numPrice *item.quantity)
    },0)
})
const formattedTotal =computed(() =>{
   return `₺${total.value.toFixed(2)}`
})
</script>