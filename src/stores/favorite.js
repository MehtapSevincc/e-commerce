import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [],
  }),

  actions: {
    addToFavorites(product) {
      const exists = this.favorites.find((p) => p.id === product.id);
      if (!exists) {
        this.favorites.push(product);
      }
    },

    removeFromFavorites(productId) {
      this.favorites = this.favorites.filter((p) => p.id !== productId);
    },

    toggleFavorite(product) {
      const exists = this.favorites.find((p) => p.id === product.id);
      if (exists) {
        this.removeFromFavorites(product.id);    
      } else {
        this.addToFavorites(product);
      }
    },

    isFavorite(productId) {
      return this.favorites.some((p) => p.id === productId);  
    },
  },
  persist:true,
});
