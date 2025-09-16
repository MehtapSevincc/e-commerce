import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

  const shippingFee=20;

  function addToCart(product) {

    const existing = items.value.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter((item) => item.id !== productId);
  }

  function decreaseQuantity(productId) {
    const item = items.value.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

  function clearCart() {
    items.value = [];
  }

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity * item.numPrice, 0)
  );

const discount =computed(() =>{
  return items.value.reduce((sum,item)=>{
    const discountedUnits = Math.floor(item.quantity/2);
    return sum+(discountedUnits*item.numPrice*0.5);
  },0);
});
const discountedTotal =computed(()=> totalPrice.value-discount.value);
const finalTotal =computed(()=> {
  const hasItems =items.value.length > 0;
  return discountedTotal.value +(hasItems? shippingFee:0);
});





  return {     
    items,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,

    discount,
    discountedTotal,
    finalTotal,
    shippingFee,
  
  };
},  {
persist:true,
});
