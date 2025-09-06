
import { defineStore } from "pinia";

export const useCartStore = defineStore('cart',{
    state:()=> ({
        items:[]
    }),
    actions:{
        addToCart(product){
            const existing =this.items.find(item=>item.id===product.id)
            if(existing){
                existing.quantity++
            }
            else {
                this.items.push({...product,quantity:1})

            }
        },
        removeFromCart(productId){
            this.items=this.items.filter(item=>item.id !== productId)
        },
        decreaseQuantity(productId){
const item =this.items.find(item=>item.id===productId);
  if(item && item.quantity >1){
    item.quantity--;
  }
        },
        clearCart(){
            this.items =[]
        }
    },
    getters: {
        totalItems:(state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice:(state)=>state.items.reduce((sum,item)=>sum+(item.quantity*item.numPrice),0),
        
    }
})

