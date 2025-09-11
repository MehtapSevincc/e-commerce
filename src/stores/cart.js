import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

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

  return {
    items,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
},  {
persist:true,
});
