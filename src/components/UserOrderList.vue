<template>
  <div class="user-order-list">
    <h2>历史订单信息</h2>
    <div class="order-item" v-for="order in orders" :key="order.id">
      <div class="order-header">
        <span>订单号：{{ order.id }}</span>
        <span>状态：{{ order.status }}</span>
      </div>
      <div class="order-detail">
        <p>菜品名称：{{ order.foodName }}</p>
        <p>规格：{{ order.spec }}</p>
        <p>价格：{{ order.price }}元</p>
        <p>月销量：{{ order.monthlySales }}单</p>
        <p>描述：{{ order.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const orders = reactive([
      {
        id: 'ORDER001',
        status: '已完成',
        foodName: '经典牛肉面',
        spec: '大份',
        price: 25,
        monthlySales: 100,
        description: '精选牛肉，浓郁汤汁，搭配手工面条'
      },
      {
        id: 'ORDER002',
        status: '制作中',
        foodName: '香辣炸鸡汉堡',
        spec: '单人份',
        price: 18,
        monthlySales: 150,
        description: '外酥里嫩的炸鸡，搭配新鲜蔬菜和特制酱料'
      },
      {
        id: 'ORDER003',
        status: '待支付',
        foodName: '水果沙拉套餐',
        spec: '标准份',
        price: 22,
        monthlySales: 80,
        description: '多种新鲜水果搭配，健康又美味'
      }
    ]);
    return {
      orders
    };
  }
});
</script>

<style scoped>
.user-order-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}
.order-item {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
}
.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: bold;
}
.order-detail p {
  margin: 5px 0;
}
</style>