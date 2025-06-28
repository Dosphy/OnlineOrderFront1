<template>
  <div class="order-processing">
    <h2>订单处理</h2>
    <div class="order-filter">
      <select v-model="filterStatus">
        <option value="all">全部订单</option>
        <option value="pending">待处理</option>
        <option value="processing">处理中</option>
        <option value="completed">已完成</option>
      </select>
      <button @click="refreshOrders">刷新</button>
    </div>
    <table class="order-table">
      <thead>
        <tr>
          <th>订单号</th>
          <th>用户</th>
          <th>菜品</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.username }}</td>
          <td>{{ order.foodName }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button @click="processOrder(order)" v-if="order.status === 'pending'">处理</button>
            <button @click="completeOrder(order)" v-if="order.status === 'processing'">完成</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue'; //添加 ref 导入

export default defineComponent({
  setup() {
    const orders = reactive([
      { id: 'ORD001', username: '小小怪', foodName: '排骨焖饭', status: 'pending' },
      { id: 'ORD002', username: '大大怪', foodName: '冷泡汁小龙虾', status: 'processing' },
      { id: 'ORD003', username: '用户3', foodName: '排骨焖饭', status: 'completed' }
    ]);

    const filterStatus = ref('all'); 

    const filteredOrders = computed(() => {
      if (filterStatus.value === 'all') { //访问 ref 的值需要 .value
        return orders;
      }
      return orders.filter(order => order.status === filterStatus.value); //使用 .value
    });

    const processOrder = (order: any) => {
      order.status = 'processing';
      console.log('处理订单:', order);
    };

    const completeOrder = (order: any) => {
      order.status = 'completed';
      console.log('完成订单:', order);
    };

    const refreshOrders = () => {
      console.log('刷新订单');
      // 实现刷新逻辑
    };

    return {
      orders,
      filterStatus,
      filteredOrders,
      processOrder,
      completeOrder,
      refreshOrders
    };
  }
});
</script>

<style scoped>
.order-processing {
  max-width: 1000px;
  margin: 0 auto;
}
.order-filter {
  margin-bottom: 20px;
}
.order-table {
  width: 100%;
  border-collapse: collapse;
}
.order-table th,
.order-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>