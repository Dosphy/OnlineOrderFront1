<template>
  <div class="order-processing">
    <!-- 标题 -->
    <h2>订单处理</h2>
    
    <!-- 筛选 + 刷新区域 -->
    <div class="order-filter">
      <select v-model="filterStatus">
        <option value="all">全部订单</option>
        <option value="processing">处理中</option>
        <option value="completed">已完成</option>
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
              <!-- 仅处理中状态显示“完成”按钮 -->
              <button 
                class="action-btn complete-btn" 
                @click="completeOrder(order)" 
                v-if="order.status === 'processing'"
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
import { defineComponent, reactive, computed, ref } from 'vue'; 

export default defineComponent({
  setup() {
    // 订单数据：仅保留处理中、已完成状态
    const orders = reactive([
      { id: 'ORD002', username: '大大怪', foodName: '冷泡汁小龙虾', status: 'processing' },
      { id: 'ORD003', username: '用户3', foodName: '排骨焖饭', status: 'completed' }
    ]);

    // 筛选状态（全部/处理中/已完成）
    const filterStatus = ref('all'); 

    // 动态过滤订单
    const filteredOrders = computed(() => {
      if (filterStatus.value === 'all') {
        return orders; // 全部订单（仅处理中、已完成）
      }
      return orders.filter(order => order.status === filterStatus.value);
    });

    // 完成订单（处理中 → 已完成）
    const completeOrder = (order: any) => {
      order.status = 'completed';
      console.log('订单完成:', order);
    };

    // 刷新订单（可扩展实际逻辑，如重新拉取数据）
    const refreshOrders = () => {
      console.log('刷新订单列表');
    };

    return {
      filterStatus,
      filteredOrders,
      completeOrder,
      refreshOrders
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
  min-width: 600px;
  border-collapse: separate; /* 分离边框，配合圆角 */
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
  background-color: #67c23a; /* 绿色 */
  color: #fff;
}

.complete-btn:hover {
  background-color: #85ce61;
}
</style>