<template>
  <div class="stock-management">
    <div class="main-content">
      <h2>库存管理</h2>
      <el-table :data="stockList" style="width: 100%" border>
        <el-table-column label="材料名称" min-width="200">
          <template #default="scope">
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #default>
                <div>材料名称: {{ scope.row.material }}</div>
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
        
        <el-table-column label="类型" min-width="200" align="center">
          <template #default="scope">
            <span>{{ scope.row.mat_cat }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="库存数量" min-width="200" align="center">
          <template #default="scope">
            <span :class="{ 'warning-text': scope.row.mat_num < scope.row.mat_minnum }">
              {{ scope.row.mat_num }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="最低库存" width="200" align="center">
          <template #default="scope">
            <span>{{ scope.row.mat_minnum }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="220" align="center">
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
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getStock, addStock } from '../api/stockApi.js'

interface StockItem {
  material: string;
  mat_cat: string;
  mat_num: number;
  mat_minnum: number;
}

export default defineComponent({
  setup() {
    const stockList = ref<StockItem[]>([]);
    const currentReplenishItem = ref<StockItem | null>(null);

    const getStockInfo = async () => {
      try {
        const response = await getStock();
        stockList.value = response.data;
        console.log("库存信息", stockList.value);
      } catch (error) {
        console.error("获取库存失败:", error);
        ElMessage.error("获取库存信息失败");
      }
    };
    
    const handleReplenish = (index: number) => {
      currentReplenishItem.value = stockList.value[index];
      ElMessageBox.prompt(`补货-${currentReplenishItem.value.material}`, '补货', {
        confirmButtonText: '确认补货',
        cancelButtonText: '取消',
        inputPattern: /^[1-9]\d*$/,
        inputErrorMessage: '请输入有效的正整数',
      })
      .then(({ value }) => {
        const number = Number(value);
        confirmReplenish(number);
        ElMessage.success(`共补货: ${value}件`);
      })
      .catch(() => {
        ElMessage.info('补货取消');
      });
    };

    const confirmReplenish = async (number: number) => {
      if (number > 0 && currentReplenishItem.value) {
        currentReplenishItem.value.mat_num += number;
        console.log("相关信息",currentReplenishItem.value.material,number)
        const addStockPart = await addStock(currentReplenishItem.value.material,number);
        // 这里可以添加API调用更新后端数据
      }
    };

    onMounted(getStockInfo);

    return {
      stockList,
      handleReplenish,
    };
  }
});
</script>

<style scoped>
.stock-management {
  display: flex;
  height: 100vh;
}
.main-content {
  flex: 1;
  padding: 24px;
  background: #f3f3f4;
}
.warning-text {
  color: #f56c6c;
  font-weight: bold;
}
</style>