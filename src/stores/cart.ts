// stores/cart.ts
import { defineStore } from 'pinia';

interface Dish {
  dish_id: number;
  dish_name: string;
  path: string;
  price: number;
  mon_sale: number;
  discribe: string;
  count: number;
  //selectedSpec: string;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as Dish[],
  }),
  actions: {
    addToCart(dish: Dish) {
      const existingItem = this.cartItems.find(
        item => item.name === dish.dish_name
      );
      
      if (existingItem) {
        existingItem.count += dish.count;
      } else {
        this.cartItems.push({ ...dish });
      }
    },
    incrementCount(index: number) {
      this.cartItems[index].count++;
    },
    decrementCount(index: number) {
      if (this.cartItems[index].count > 1) {
        this.cartItems[index].count--;
      } else {
        this.removeItem(index);
      }
    },
    removeItem(index: number) {
      this.cartItems.splice(index, 1);
    },
    clearCart() {
      this.cartItems = [];
    }
  },
  persist: true // 如果需要持久化存储
});