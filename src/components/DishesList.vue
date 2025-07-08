<template>
  <div class="dishes-list">
    <div class="dish-item" v-for="dish in dishes" :key="dish.dish_id">
      <img :src="dish.path" :alt="dish.dish_name" class="dish-img" />
      <div class="dish-info">
        <div class="dish-name">{{ dish.dish_name }}</div>
        <div class="dish-price">价格：{{ dish.price }}元</div>
        <div class="dish-monthly-sales">月销量：{{ dish.mon_sale }}单</div>
        <div class="dish-description">描述：{{ dish.discribe }}</div>
        <div class="dish-count">
          数量：{{ dish.count }}
          <button @click="incrementCount(dish)">+</button>
          <button v-if="dish.count > 0" @click="decrementCount(dish)">-</button>
          <button v-if="dish.count > 0" @click="addToCart(dish)" class="add-to-cart-btn">加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { getGoodsInfo } from '../api/goodsApi.js';
import { ElMessage } from 'element-plus';

interface Dish {
  dish_id: number;
  dish_name: string;
  path: string;
  price: number;
  mon_sale: number;
  discribe: string;
  count: number;
}

export default defineComponent({
  setup() {
    const cartStore = useCartStore();

    const dishes = reactive<Dish[]>([]);

    const getDishes = async () => {
      const response = await getGoodsInfo();
      if (response.code === 400) {
        // 初始化菜品数据，添加count和selectedSpec字段
        response.data.forEach((dish: any) => {
          dishes.push({
            ...dish,
            count: 0,
          });
        });
      } else {
        ElMessage({
          message: '获取菜单信息失败！',
          type: 'error',
        });
      }
    }

    const incrementCount = (dish: Dish) => {
      dish.count++;
    };

    const decrementCount = (dish: Dish) => {
      if (dish.count > 0) {
        dish.count--;
      }
    };

    const addToCart = (dish: Dish) => {
      if (dish.count > 0) {
        cartStore.addToCart({
          ...dish,
        });
        dish.count = 0;
        ElMessage.success('加入购物车成功!');
      }
    };

    onMounted(() => {
      getDishes();
    });

    return {
      dishes,
      incrementCount,
      decrementCount,
      addToCart,
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