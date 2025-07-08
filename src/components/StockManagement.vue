<template>
  <div class="stock-management">
    <h2>库存管理</h2>
  </div>
  <!-- <el-table :data="stockList" style="width: 100%">
      <el-table-column label="材料名称" minwidth="200">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>材料名称 {{ scope.row.material }}</div>
              <div>类型: {{ scope.row.mat_cat }}</div>
              <div>当前库存: {{ scope.row.mat_num }}</div>
              <div>最低库存: {{ scope.row.mat_minnum }}</div>
            </template>
            <template #reference>
              <el-tag :type="scope.row.mat_num < scope.row.mat_minnum ? 'danger' : 'success'">
                {{ scope.row.material }}
              </el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      
      <el-table-column label="类型" minwidth="200">
        <template #default="scope">
          <span>{{ scope.row.mat_cat }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="库存数量" minwidth="200">
        <template #default="scope">
          <span :class="{ 'warning-text': scope.row.mat_num < scope.row.mat_minnum }">
            {{ scope.row.mat_num }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="最低库存" width="200">
        <template #default="scope">
          <span>{{ scope.row.mat_minnum }}</span>
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
            v-if="scope.row.mat_num < scope.row.mat_minnum" 
            type="danger" 
            size="small"
            style="margin-left: 8px"
          >
            库存不足
          </el-tag>
        </template>
      </el-table-column>
    </el-table> -->
    <template>
  <el-table :data="stockList" stripe style="width: 100%">
    <el-table-column prop="material_id" label="材料id" width="180" />
    <el-table-column prop="material" label="材料名称" width="180" />
    <el-table-column prop="mat_cat" label="类型" width="180" />
    <el-table-column prop="mat_num" label="库存" width="180"/>
    <el-table-column prop="mat_minnum" label="最低库存" />
  </el-table>
</template>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, warn } from 'vue';
import { ElMessage,ElMessageBox } from 'element-plus';
import { getStock } from '../api/stockApi.js'

export default defineComponent({
  setup() {
    const stockList = reactive([]);

    const getStockInfo = async () => {
      const response = await getStock();
      stockList.splice(0, stockList.length, ...response.data);
      console.log("库存信息",stockList)
    }
    
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

    onMounted(getStockInfo)

    return {
      stockList,
      currentReplenishItem,
      handleReplenish,
      confirmReplenish,
      getStockInfo
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