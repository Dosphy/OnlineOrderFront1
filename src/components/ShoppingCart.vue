<template>
  <div class="cart-container">
    <h2>我的购物车</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      购物车是空的，快去添加商品吧！
    </div>
    <div v-else>
      <div class="cart-items">
        <div class="cart-item" v-for="(item, index) in cartItems" :key="item.dish_name">
          <img :src="item.path" alt="item.name" class="cart-item-img" />
          <div class="cart-item-info">
            <div class="cart-item-name">{{ item.dish_name }}</div>
            <div class="cart-item-price">单价：{{ item.price }}元</div>
            <div class="cart-item-count">
              <button @click="decrementCount(index)">-</button>
              <span>{{ item.count }}</span>
              <button @click="incrementCount(index)">+</button>
            </div>
            <div class="cart-item-total">小计：{{ item.price * item.count }}元</div>
            <button class="remove-btn" @click="removeItem(index)">删除</button>
          </div>
        </div>
      </div>
      <div class="cart-summary">
        <div class="total-amount">总金额：{{ totalAmount }}元</div>
        <button class="checkout-btn" @click="checkout">去结算</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { ElMessage, ElMessageBox } from 'element-plus';
import { sendOreder } from '../api/userApi.js';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    // 从状态管理获取购物车数据
    const cartStore = useCartStore();
    const router = useRouter();
    // 计算总金额
    const totalAmount = computed(() => {
      return cartStore.cartItems.reduce((total, item) => {
        return total + (item.price * item.count);
      }, 0);
    });

    // 增加数量
    const incrementCount = (index: number) => {
      cartStore.incrementCount(index);
    };

    // 减少数量
    const decrementCount = (index: number) => {
      cartStore.decrementCount(index);
    };

    // 删除商品
    const removeItem = (index: number) => {
      cartStore.removeItem(index);
    };

    // 结算
    const checkout = async () => {
      if (cartStore.cartItems.length === 0) {
        ElMessage.error('购物车为空，无法结算！');
        return;
      }

      try {
        const username = localStorage.getItem("username");
        if (!username) {
          ElMessage.error('用户未登录');
          router.push('/login');
          return;
        }

        // 1. 合并相同商品
        const mergedItems = cartStore.cartItems.reduce((acc, item) => {
          const existing = acc.find(i => i.dish_name === item.dish_name);
          if (existing) {
            existing.count += item.count;
          } else {
            acc.push({ ...item });
          }
          return acc;
        }, []);

        // 2. 确认订单
        const confirmResult = await ElMessageBox.confirm(
          `确认购买 ${mergedItems.length} 种商品，总金额 ${totalAmount.value} 元？`,
          '确认订单',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        );

        // 3. 为每种商品创建独立订单
        // const orderPromises = mergedItems.map(item => {
        //   const orderData = {
        //     dishName: item.dish_name,
        //     totalPrice: item.price * item.count, // 单种商品总价
        //     number: item.count,                 // 单种商品数量
        //     username: username,
        //     orderTime: null, // 自动生成时间可不传
        //     status: 0
        //   };
        //   return sendOreder(orderData);
        // });

        // 4. 发送所有订单
        //   const results = await Promise.all(orderPromises);
        //   const allSuccess = results.every(res => res.code === 1300);

        //   if (allSuccess) {
        //     ElMessage.success(`成功提交 ${mergedItems.length} 个订单！`);
        //     cartStore.clearCart();
        //     window.location.reload()
        //   } else {
        //     const errorMessages = results
        //       .filter(res => res.code !== 1300)
        //       .map(res => res.message)
        //       .join('; ');
        //     ElMessage.error(`部分订单提交失败: ${errorMessages}`);
        //   }
        // } catch (error) {
        //   if (error !== 'cancel') {
        //     ElMessage.error('下单过程中出错: ' + (error.message || error));
        //   }
        // }
        // 改为单个提交避免部分失败
        for (const item of mergedItems) {
          const response = await sendOreder({
            dishName: item.dish_name,
            totalPrice: item.price * item.count,
            number: item.count,
            username: username,
            status: 0
          });

          if (response.code !== 1300) {
            throw new Error(response.message);
          }
        }

        ElMessage.success(`成功提交 ${mergedItems.length} 个订单！`);
        cartStore.clearCart();
        window.location.reload()
      } catch (error) {
        ElMessage.error("提交失败!");
      }
    };

    return {
      cartItems: cartStore.cartItems,
      totalAmount,
      incrementCount,
      decrementCount,
      removeItem,
      checkout
    };
  }
});
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.empty-cart {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
}

.cart-items {
  margin-bottom: 30px;
}

.cart-item {
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 15px 0;
  align-items: center;
}

.cart-item-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 20px;
}

.cart-item-info {
  flex: 1;
}

.cart-item-name {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.cart-item-spec,
.cart-item-price {
  color: #666;
  margin-bottom: 5px;
}

.cart-item-count {
  margin: 10px 0;
}

.cart-item-count button {
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}

.cart-item-count button:hover {
  background-color: #e0e0e0;
}

.cart-item-total {
  font-weight: bold;
  color: #e53935;
  margin: 5px 0;
}

.remove-btn {
  background-color: #ffebee;
  color: #e53935;
  border: 1px solid #ef9a9a;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 5px;
}

.remove-btn:hover {
  background-color: #ef9a9a;
  color: white;
}

.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.total-amount {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e53935;
}

.checkout-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: #388e3c;
}
</style>