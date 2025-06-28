<template>
  <div class="dishes-list">
    <div 
      class="dish-item" 
      v-for="dish in dishes" 
      :key="dish.name"
    >
      <img :src="dish.image" alt="dish.image" class="dish-img" />
      <div class="dish-info">
        <div class="dish-name">{{ dish.name }}</div>
        <div class="dish-spec">
          <label>规格：</label>
          <select v-model="dish.selectedSpec">
            <option value="小份">小份</option>
            <option value="中份">中份</option>
            <option value="大份">大份</option>
          </select>
        </div>
        <div class="dish-price">价格：{{ dish.price }}元</div>
        <div class="dish-monthly-sales">月销量：{{ dish.monthlySales }}单</div>
        <div class="dish-description">描述：{{ dish.description }}</div>
        <div class="dish-count">
          数量：{{ dish.count }}
          <button @click="incrementCount(dish)">+</button>
          <button v-if="dish.count > 0" @click="decrementCount(dish)">-</button>
          <button v-if="dish.count > 0" @click="addToCart(dish)"class="add-to-cart-btn">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useCartStore } from '../stores/cart';

export default defineComponent({
setup() {
    const cartStore = useCartStore();
    
    const dishes = reactive([
      {
        name: '排骨焖饭',
        image: '/排骨焖饭.jpg', // public 下的资源可直接这样引用
        selectedSpec: '小份',
        price: 20,
        monthlySales: 80,
        description: '排骨软烂入味，米饭吸收排骨香气',
        count: 0
      },
      {
        name: '冷泡汁小龙虾',
        image: '/冷泡汁小龙虾.jpg',
        selectedSpec: '小份',
        price: 35,
        monthlySales: 120,
        description: '独特冷泡汁，小龙虾鲜嫩爽口',
        count: 0
      }
    ]);

    const incrementCount = (dish: any) => {
      dish.count++;
    };

    const decrementCount = (dish: any) => {
      if (dish.count > 0) {
        dish.count--;
      }
    };

    const addToCart = (dish: any) => {
      if (dish.count > 0) {
        cartStore.addToCart({ ...dish });
        dish.count = 0; // 重置数量
      }
    };

    return {
      dishes,
      incrementCount,
      decrementCount,
      addToCart
    };
  }
});
</script>

<style scoped>
.dishes-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}
.dish-item {
  width: 45%;
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.dish-img {
  width: 50%;
  border-radius: 4px;
  margin-bottom: 5px;
}
.dish-info {
  text-align: left;
}
.dish-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}
.dish-spec,
.dish-price,
.dish-monthly-sales,
.dish-description,
.dish-count {
  margin-bottom: 5px;
}
.dish-count button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.dish-count button:hover {
  background-color: #0056b3;
}
</style>