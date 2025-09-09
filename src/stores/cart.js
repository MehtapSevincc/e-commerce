import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const storedItems=localStorage.getItem("cartItems");
  const items = ref(storedItems? JSON.parse(storedItems):[]);

  function saveToLocalStorage(){
    localStorage.setItem("cartItems",JSON.stringify(items.value));
  }

  function addToCart(product) {
    const existing = items.value.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
    saveToLocalStorage();
  }

  function removeFromCart(productId) {
    items.value = items.value.filter((item) => item.id !== productId);
    saveToLocalStorage();
  }

  function decreaseQuantity(productId) {
    const item = items.value.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
      saveToLocalStorage();
    }
  }

  function clearCart() {
    items.value = [];
    saveToLocalStorage();
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
});
