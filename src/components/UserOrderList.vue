<template>
  <div class="user-order-container">
    <div class="user-order-list">
      <h2 class="order-title">历史订单信息</h2>
      <el-table :data="orders" stripe style="width: 100%">
        <el-table-column prop="id" label="订单号" width="180" />
        <el-table-column prop="status" label="状态" width="180" />
        <el-table-column prop="foodName" label="菜品名称" />
        <el-table-column prop="spec" label="规格" width="120" />
        <el-table-column prop="price" label="价格(元)" width="120" />
        <el-table-column prop="monthlySales" label="月销量" width="120" />
        <el-table-column prop="description" label="描述" />
      </el-table>
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

/* 表格样式调整 */
.el-table {
  margin-top: 15px;
}

.el-table::before {
  height: 0; /* 移除表格底部边框 */
}

/* 表头样式 */
.el-table th {
  background-color: #f5f7fa;
  color: #333;
  font-weight: bold;
}

/* 表格行悬停效果 */
.el-table .el-table__body tr:hover>td {
  background-color: #f5f7fa !important;
}
</style>