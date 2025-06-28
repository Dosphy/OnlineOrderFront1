<template>
  <div class="stock-management">
    <h2>库存管理</h2>
  </div>
  <el-table :data="stockList" style="width: 100%">
      <el-table-column label="材料名称" width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>材料名称 {{ scope.row.name }}</div>
              <div>类型: {{ scope.row.type }}</div>
              <div>当前库存: {{ scope.row.quantity }}</div>
              <div>最低库存: {{ scope.row.warningThreshold }}</div>
            </template>
            <template #reference>
              <el-tag :type="scope.row.quantity < scope.row.warningThreshold ? 'danger' : 'success'">
                {{ scope.row.name }}
              </el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      
      <el-table-column label="类型" width="120">
        <template #default="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="库存数量" width="120">
        <template #default="scope">
          <span :class="{ 'warning-text': scope.row.quantity < scope.row.warningThreshold }">
            {{ scope.row.quantity }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="最低库存" width="120">
        <template #default="scope">
          <span>{{ scope.row.warningThreshold }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleReplenish(scope.$index)"
          >
            补货
          </el-button>
          <el-tag 
            v-if="scope.row.quantity < scope.row.warningThreshold" 
            type="danger" 
            size="small"
            style="margin-left: 8px"
          >
            库存不足
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
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