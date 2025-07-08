<template>
  <div class="user-order-container">
    <div class="user-order-list">
      <h2 class="order-title">历史订单信息</h2>
      <el-table :data="orders" stripe style="width: 100%">
        <el-table-column prop="order_id" label="订单号" width="180" />
        <el-table-column prop="dish_name" label="菜品名称" />
        <el-table-column prop="total_price" label="价格(元)" width="120" />
        <el-table-column prop="number" label="数量" width="120" />
        <el-table-column prop="formattedOrderTime" label="下单时间" />
      </el-table>
      <div v-if="orders.length === 0" class="no-order">
        暂无订单记录
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { getHistoryOrder } from '../api/userApi';

export default defineComponent({
  setup() {
    const orders = reactive<any[]>([]);
    const username = localStorage.getItem('username');

    // 补零函数
    const padZero = (num: number): string => {
      return num < 10 ? `0${num}` : `${num}`;
    };

    // 时间戳转换函数
    const formatTimestamp = (timestamp: number) => {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = padZero(date.getMonth() + 1);
      const day = padZero(date.getDate());
      const hours = padZero(date.getHours());
      const minutes = padZero(date.getMinutes());
      const seconds = padZero(date.getSeconds());
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const fetchOrders = async () => {
      try {
        const response = await getHistoryOrder(username);
        if (response.code === 1000) {
          orders.length = 0;
          const formattedOrders = response.data.map((order: any) => ({
            ...order,
            formattedOrderTime: formatTimestamp(order.orderTime)
          }));
          orders.push(...formattedOrders);
        } else {
          console.error('获取订单信息失败:', response.message);
        }
      } catch (error) {
        console.error('请求订单信息失败:', error);
      }
    };

    onMounted(() => {
      fetchOrders();
    });

    return {
      orders,
    };
  },
});
</script>

<style scoped>
/* 样式保持不变 */
.user-order-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.user-order-list {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.order-title {
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.el-table {
  margin-top: 15px;
}

.el-table::before {
  height: 0;
}

.el-table th {
  background-color: #f5f7fa;
  color: #333;
  font-weight: bold;
}

.el-table .el-table__body tr:hover>td {
  background-color: #f5f7fa !important;
}

.no-order {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>