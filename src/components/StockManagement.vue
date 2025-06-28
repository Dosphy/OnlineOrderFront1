<template>
  <div class="stock-management">
    <h2>库存管理</h2>
    <!-- 库存列表 -->
    <div class="stock-list">
      <div 
        v-for="(item, index) in stockList" 
        :key="index" 
        class="stock-item"
      >
        <div class="item-info">
          <span>{{ item.name }}</span>
          <span>当前库存：{{ item.quantity }}</span>
        </div>
        <div class="actions">
          <el-button type="primary" @click="handleReplenish(index)">补货</el-button>
          <span 
            v-if="item.quantity < item.warningThreshold" 
            class="warning"
          >
            库存不足！
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { ElMessage,ElMessageBox } from 'element-plus';

export default defineComponent({
  setup() {
    // 模拟库存数据
    const stockList = reactive([
      { 
        name: '牛肉原料', 
        type: 'material', 
        quantity: 50, 
        warningThreshold: 20 
      },
      { 
        name: '一次性杯子', 
        type: 'material', 
        quantity: 100, 
        warningThreshold: 30 
      },
      { 
        name: '炸鸡原料', 
        type: 'material', 
        quantity: 30, 
        warningThreshold: 15 
      }
    ]);

    const currentReplenishItem = ref<any>(null);

    // 打开补货弹窗
    const handleReplenish = (index: number) => {
      currentReplenishItem.value = stockList[index];
      ElMessageBox.prompt('补货-'+currentReplenishItem.value.name, '补货', {
        confirmButtonText: '确认补货',
        cancelButtonText: '取消',
        inputPattern:/^[1-9]\d*$/,
        inputErrorMessage: '无效的数字',
      })
    .then(({ value }) => {
      const number = Number(value);
      confirmReplenish(number);
      ElMessage({
        type: 'success',
        message: `共补货:${value}件`,
      })
      
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '补货取消',
      })
    })
    
    };

    // 确认补货
    const confirmReplenish = (number) => {
      if (number > 0) {
        currentReplenishItem.value.quantity += number;
      } 
    };

    return {
      stockList,
      currentReplenishItem,
      handleReplenish,
      confirmReplenish
    };
  }
});
</script>

<style scoped>
.stock-management {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}
.stock-list {
  margin-top: 20px;
}
.stock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
}
.item-info {
  display: flex;
  flex-direction: column;
}
.actions {
  display: flex;
  align-items: center;
}
.warning {
  color: red;
  margin-left: 10px;
}
.replenish-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
.modal-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>