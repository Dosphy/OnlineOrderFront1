<template>
  <div class="order-processing">
    <!-- 标题 -->
    <h2>订单处理</h2>
    
    <!-- 筛选 + 刷新区域 -->
    <div class="order-filter">
      <select v-model="filterStatus">
        <option value="all">全部订单</option>
        <option value="0">处理中</option>
        <option value="1">已完成</option>
      </select>
      <button class="refresh-btn" @click="refreshOrders">刷新</button>
    </div>
    
    <!-- 订单表格 -->
    <div class="table-container">
      <table class="order-table">
        <thead>
          <tr>
            <th>订单号</th>
            <th>用户</th>
            <th>菜品</th>
            <th>总价格</th>
            <th>下单时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.username }}</td>
            <td>{{ order.foodName }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>{{ formatDate(order.orderTime) }}</td>
            <td>{{ order.status === 0 ? '处理中' : '已完成' }}</td>
            <td>
              <button 
                class="action-btn complete-btn" 
                @click="completeOrder(order)" 
                v-if="order.status === 0"
              >
                完成
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onMounted } from 'vue';
import { dealUserOrder } from '../api/adminApi.js';
import { ElMessage } from 'element-plus';
import axios from 'axios';

interface Order {
  id: number;
  username: string;
  foodName: string;
  status: number;
  totalPrice: number;
  orderTime: Date;
}

export default defineComponent({
  setup() {
    // 订单数据
    const orders = reactive<Order[]>([]);
    // 筛选状态（全部/处理中/已完成）
    const filterStatus = ref('all');

    // 获取订单数据
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/adminControl/getUserOrders');
        if (response.data.code === 1700) { // 假设1700是获取订单成功的状态码
          orders.splice(0); // 清空现有订单
          response.data.data.forEach((item: any) => {
            orders.push({
              id: item.orderId,
              username: item.username,
              foodName: item.dishName,
              status: item.status,
              totalPrice: item.totalPrice,
              orderTime: new Date(item.orderTime)
            });
          });
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // 动态过滤订单
    const filteredOrders = computed(() => {
      if (filterStatus.value === 'all') {
        return orders;
      }
      return orders.filter(order => order.status === parseInt(filterStatus.value));
    });

    // 完成订单（处理中 → 已完成）
    const completeOrder = async (order: Order) => {
      console.log(order.id)
      const response = await dealUserOrder(order.id)
      if (response.code === 1800) {
        order.status = 1;
        ElMessage.success('处理成功!');
      } else {
        ElMessage.error('处理失败!');
      }
    };

    // 刷新订单
    const refreshOrders = () => {
      fetchOrders();
    };

    // 格式化日期时间
    const formatDate = (date: Date): string => {
      return date.toLocaleString();
    };

    // 生命周期钩子：组件挂载后获取订单数据
    onMounted(() => {
      fetchOrders();
    });

    return {
      orders,
      filterStatus,
      filteredOrders,
      completeOrder,
      refreshOrders,
      formatDate
    };
  }
});
</script>

<style scoped>
/* 页面容器 */
.order-processing {
  max-width: 1200px;
  margin: 30px auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* 标题 */
h2 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
}

/* 筛选区 */
.order-filter {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.order-filter select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.refresh-btn {
  background-color: #409eff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.refresh-btn:hover {
  background-color: #66b1ff;
}

/* 表格容器（适配小屏幕滚动） */
.table-container {
  overflow-x: auto;
}

/* 订单表格 */
.order-table {
  width: 100%;
  min-width: 800px;
  border-collapse: separate;
  /* 分离边框，配合圆角 */
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

/* 表头 */
.order-table thead {
  background-color: #f5f7fa;
}

.order-table th,
.order-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

.order-table th {
  font-weight: 600;
  color: #666;
}

/* 表格行交互 */
.order-table tbody tr {
  transition: background-color 0.3s ease;
}

.order-table tbody tr:hover {
  background-color: #f8fafc;
}

/* 斑马纹（偶数行背景） */
.order-table tbody tr:nth-child(even) {
  background-color: #fcfcfc;
}

/* 操作按钮 */
.action-btn {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.complete-btn {
  background-color: #67c23a;
  /* 绿色 */
  color: #fff;
}

.complete-btn:hover {
  background-color: #85ce61;
}
</style>