<template>
  <div class="menu-management">
    <h2>菜单管理</h2>

    <!-- 新增菜品表单（表格布局） -->
    <div class="panel add-dish-form">
      <h3>新增菜品</h3>
      <form @submit.prevent="addDish" class="form-table">
        <table>
          <tbody>
            <tr>
              <td class="label-cell"><label>菜品名称</label></td>
              <td class="input-cell"><input v-model="newDish.name" required /></td>
            </tr>
            <tr>
              <td class="label-cell"><label>图片路径</label></td>
              <td class="input-cell"><input v-model="newDish.image" placeholder="/dish-image.jpg" /></td>
            </tr>
            <tr>
              <td class="label-cell"><label>价格</label></td>
              <td class="input-cell"><input v-model.number="newDish.price" type="number" min="0" step="0.01" required />
              </td>
            </tr>
            <tr>
              <td class="label-cell"><label>月销量</label></td>
              <td class="input-cell"><input v-model.number="newDish.monthlySales" type="number" min="0" required /></td>
            </tr>
            <tr>
              <td class="label-cell"><label>描述</label></td>
              <td class="input-cell"><textarea v-model="newDish.description" rows="3"></textarea></td>
            </tr>
            <tr>
              <td colspan="2" class="button-cell">
                <button type="submit">添加</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>

    <!-- 菜品列表（保持表格，优化样式统一） -->
    <div class="panel dish-list">
      <h3>菜品列表</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>菜品图片</th>
            <th>菜品名称</th>
            <th>菜品单价</th>
            <th>月销量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dish, index) in dishes" :key="index">
            <td>{{ index + 1 }}</td>
            <td><img :src="dish.path" :alt="dish.dish_name" class="dish-image" /></td>
            <td>{{ dish.dish_name }}</td>
            <td>{{ dish.price }} 元</td>
            <td>{{ dish.monthlySales }} 单</td>
            <td class="action-cell">
              <button @click="editDish(index)">编辑</button>
              <button @click="deleteDish(index)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 编辑弹窗（同样表格布局） -->
    <div v-if="editingIndex !== -1" class="edit-modal">
      <div class="modal-content">
        <h3>编辑菜品</h3>
        <form @submit.prevent="saveEdit" class="form-table">
          <table>
            <tbody>
              <tr>
                <td class="label-cell"><label>菜品名称</label></td>
                <td class="input-cell"><input v-model="editedDish.name" required /></td>
              </tr>
              <tr>
                <td class="label-cell"><label>图片路径</label></td>
                <td class="input-cell"><input v-model="editedDish.image" placeholder="/dish-image.jpg" /></td>
              </tr>
              <tr>
                <td class="label-cell"><label>价格</label></td>
                <td class="input-cell"><input v-model.number="editedDish.price" type="number" min="0" step="0.01"
                    required /></td>
              </tr>
              <tr>
                <td class="label-cell"><label>月销量</label></td>
                <td class="input-cell"><input v-model.number="editedDish.monthlySales" type="number" min="0" required />
                </td>
              </tr>
              <tr>
                <td class="label-cell"><label>描述</label></td>
                <td class="input-cell"><textarea v-model="editedDish.description" rows="3"></textarea></td>
              </tr>
              <tr>
                <td colspan="2" class="button-cell">
                  <button type="submit">保存</button>
                  <button @click="cancelEdit">取消</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue';
import { getGoodsInfo } from '../api/goodsApi.js'; // 引入 goodsapi
import { updateGoodsInfo, deleteGoods } from '../api/adminApi.js';
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    // 使用 reactive 创建响应式数组
    const dishes = reactive([]);

    // 从数据库获取菜品数据
    const fetchDishes = async () => {
      try {
        const response = await getGoodsInfo();
        if (response.code === 400) { // 假设后端返回的 code 400 表示成功
          // 清空现有数据并填充新数据
          dishes.splice(0, dishes.length, ...response.data);
        } else {
          console.error('获取菜品数据失败:', response.message);
        }
      } catch (error) {
        console.error('获取菜品数据失败:', error);
      }
    };

    // 在组件挂载时获取数据
    onMounted(() => {
      fetchDishes();
    });

    // 新增菜品表单数据
    const newDish = reactive({
      name: '',
      image: '',
      price: 0,
      monthlySales: 0,
      description: ''
    });

    // 编辑状态
    const editingIndex = ref(-1);
    const editedDish = reactive({
      name: '',
      image: '',
      price: 0,
      monthlySales: 0,
      description: ''
    });

    // 添加菜品
    const addDish = () => {
      if (!newDish.name || !newDish.price) return;
      dishes.push({ ...newDish });
      // 重置表单
      newDish.name = '';
      newDish.image = '';
      newDish.price = 0;
      newDish.monthlySales = 0;
      newDish.description = '';
    };

    // 编辑菜品
    const editDish = (index: number) => {
      editingIndex.value = index;
      const dish = dishes[index];

      // 复制数据到编辑表单
      editedDish.name = dish.dish_name;
      editedDish.image = dish.path; 
      editedDish.price = dish.price;
      editedDish.monthlySales = dish.monthlySales;
      editedDish.description = dish.description;
    };

    // 保存编辑
    const saveEdit = async () => {
      if (!editedDish.name || !editedDish.price) return;

      try {
        const index = editingIndex.value;
        if (index !== -1) {
          const dish = dishes[index];

          // 构造 Goods 对象
          const goods = {
            dish_id: dish.dish_id,
            dish_name: editedDish.name,
            path: editedDish.image,
            price: editedDish.price,
            mon_sale: editedDish.monthlySales,
            describe: editedDish.description
          };

          // 调用 API 更新数据库
          const response = await updateGoodsInfo(goods);

          if (response.code === 700) { 
            // 更新本地数据
            dishes[index] = {
              ...dishes[index],
              dish_name: editedDish.name,
              path: editedDish.image,
              price: editedDish.price,
              monthlySales: editedDish.monthlySales,
              description: editedDish.description
            };
            cancelEdit();
            ElMessage.success("修改成功!");
          } else {
            ElMessage.error(response.message);
          }
        }
      } catch (error) {
        ElMessage.error("修改失败!");
      }
    };
    // 取消编辑
    const cancelEdit = () => {
      editingIndex.value = -1;
    };

    // 删除菜品
    const deleteDish = async (index: number) => {
      const dish = dishes[index];
      if (!dish || !dish.dish_id) {
        ElMessage.error("无法删除：菜品信息不完整");
        return;
      }

      const confirmed = confirm(`确定要删除菜品【${dish.dish_name}】吗？`);
      if (!confirmed) return;

      try {
        const response = await deleteGoods(dish.dish_id);
        if (response.code === 800) {
          // 成功删除后，移除本地数据
          dishes.splice(index, 1);
          ElMessage.success("删除成功!");
        } else {
          ElMessage.error(response.message);
        }
      } catch (error) {
        ElMessage.error("删除失败!");
      }
    };
    return {
      dishes,
      newDish,
      editingIndex,
      editedDish,
      addDish,
      editDish,
      saveEdit,
      cancelEdit,
      deleteDish
    };
  }
});
</script>

<style scoped>
/* 整体容器 */
.menu-management {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* 面板通用样式（新增、列表） */
.panel {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.panel h3 {
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
  color: #1f2d3d;
}

/* 表单表格 & 数据表格 通用布局 */
.form-table,
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.form-table tr,
.data-table tr {
  border-bottom: 1px solid #f2f2f2;
}

.form-table tr:last-child,
.data-table tr:last-child {
  border-bottom: none;
}

.form-table td,
.data-table th,
.data-table td {
  padding: 12px 8px;
  vertical-align: middle;
}

/* 表单标签列 */
.label-cell {
  width: 120px;
  text-align: right;
  color: #475669;
  padding-right: 15px;
}

/* 表单输入列（关键修改：让输入框填满父容器） */
.input-cell {
  width: calc(100% - 120px);
}

.input-cell input,
.input-cell textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-cell input:focus,
.input-cell textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

/* 按钮列（关键修改：居中对齐） */
.button-cell {
  text-align: center !important;
  padding-top: 20px !important;
}

/* 数据表格表头 */
.data-table thead {
  background: #f8fafc;
}

.data-table th {
  font-weight: 600;
  color: #1f2d3d;
  text-align: left;
  padding: 14px 8px;
}

/* 数据表格行交互 */
.data-table tbody tr:hover {
  background: #f9fafc;
}

/* 操作列（按钮间距） */
.action-cell button {
  margin-right: 8px;
}

/* 图片样式 */
.dish-image {
  max-width: 80px;
  max-height: 60px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 按钮通用样式 */
button {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;
}

button:hover {
  background: #45a049;
}

button:active {
  transform: translateY(1px);
}

button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

/* 编辑弹窗 */
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  width: 480px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* 弹窗关闭按钮 */
.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  color: #999;
  cursor: pointer;
}

.close-button:hover {
  color: #333;
}
</style>