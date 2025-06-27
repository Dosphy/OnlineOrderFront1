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
          <button 
            v-if="item.type === 'material'" 
            @click="handleReplenish(index)"
          >
            补货
          </button>
          <span 
            v-if="item.quantity < item.warningThreshold" 
            class="warning"
          >
            库存不足！
          </span>
        </div>
      </div>
    </div>
    <!-- 补货弹窗 -->
    <div 
      class="replenish-modal" 
      v-if="showReplenishModal"
    >
      <div class="modal-content">
        <h3>补货 - {{ currentReplenishItem.name }}</h3>
        <input 
          v-model.number="replenishQuantity" 
          type="number" 
          placeholder="请输入补货数量" 
          min="1"
        />
        <div class="modal-buttons">
          <button @click="confirmReplenish">确认补货</button>
          <button @click="showReplenishModal = false">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

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
        type: 'package', 
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

    const showReplenishModal = ref(false);
    const currentReplenishItem = ref<any>(null);
    const replenishQuantity = ref(1);

    // 打开补货弹窗
    const handleReplenish = (index: number) => {
      currentReplenishItem.value = stockList[index];
      showReplenishModal.value = true;
    };

    // 确认补货
    const confirmReplenish = () => {
      if (replenishQuantity.value > 0) {
        currentReplenishItem.value.quantity += replenishQuantity.value;
        showReplenishModal.value = false;
        replenishQuantity.value = 1;
        alert('补货成功！');
      } else {
        alert('请输入有效的补货数量');
      }
    };

    return {
      stockList,
      showReplenishModal,
      currentReplenishItem,
      replenishQuantity,
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