<template>
  <div class="menu-management">
    <h2>菜单管理</h2>
    
    <!-- 新增菜品表单 -->
    <div class="add-dish-form">
      <h3>新增菜品</h3>
      <form @submit.prevent="addDish">
        <div class="form-group">
          <label>菜品名称</label>
          <input v-model="newDish.name" required />
        </div>
        <div class="form-group">
          <label>图片路径</label>
          <input v-model="newDish.image" placeholder="/dish-image.jpg" />
        </div>
        <div class="form-group">
          <label>价格</label>
          <input v-model.number="newDish.price" type="number" min="0" step="0.01" required />
        </div>
        <div class="form-group">
          <label>月销量</label>
          <input v-model.number="newDish.monthlySales" type="number" min="0" required />
        </div>
        <div class="form-group">
          <label>描述</label>
          <textarea v-model="newDish.description" rows="3"></textarea>
        </div>
        <button type="submit">添加</button>
      </form>
    </div>
    
    <!-- 菜品列表 -->
    <div class="dish-list">
      <h3>菜品列表</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>图片</th>
            <th>名称</th>
            <th>价格</th>
            <th>月销量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dish, index) in dishes" :key="index">
            <td>{{ index + 1 }}</td>
            <td><img :src="dish.image" alt="dish.name" class="dish-image" /></td>
            <td>{{ dish.name }}</td>
            <td>{{ dish.price }} 元</td>
            <td>{{ dish.monthlySales }} 单</td>
            <td>
              <button @click="editDish(index)">编辑</button>
              <button @click="deleteDish(index)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 编辑菜品弹窗 -->
    <div v-if="editingIndex !== -1" class="edit-modal">
      <div class="modal-content">
        <h3>编辑菜品</h3>
        <form @submit.prevent="saveEdit">
          <div class="form-group">
            <label>菜品名称</label>
            <input v-model="editedDish.name" required />
          </div>
          <div class="form-group">
            <label>图片路径</label>
            <input v-model="editedDish.image" placeholder="/dish-image.jpg" />
          </div>
          <div class="form-group">
            <label>价格</label>
            <input v-model.number="editedDish.price" type="number" min="0" step="0.01" required />
          </div>
          <div class="form-group">
            <label>月销量</label>
            <input v-model.number="editedDish.monthlySales" type="number" min="0" required />
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="editedDish.description" rows="3"></textarea>
          </div>
          <div class="form-actions">
            <button type="submit">保存</button>
            <button @click="cancelEdit">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';

export default defineComponent({
  setup() {
    // 模拟菜品数据
    const dishes = reactive([
      {
        name: '排骨焖饭',
        image: '/排骨焖饭.jpg',
        price: 20,
        monthlySales: 80,
        description: '排骨软烂入味，米饭吸收排骨香气'
      },
      {
        name: '冷泡汁小龙虾',
        image: '/冷泡汁小龙虾.jpg',
        price: 35,
        monthlySales: 120,
        description: '独特冷泡汁，小龙虾鲜嫩爽口'
      }
    ]);

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
      
      dishes.push({...newDish});
      
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
      editedDish.name = dish.name;
      editedDish.image = dish.image;
      editedDish.price = dish.price;
      editedDish.monthlySales = dish.monthlySales;
      editedDish.description = dish.description;
    };

    // 保存编辑
    const saveEdit = () => {
      if (!editedDish.name || !editedDish.price) return;
      
      const index = editingIndex.value;
      if (index !== -1) {
        dishes[index] = {...editedDish};
        cancelEdit();
      }
    };

    // 取消编辑
    const cancelEdit = () => {
      editingIndex.value = -1;
    };

    // 删除菜品
    const deleteDish = (index: number) => {
      if (confirm(`确定要删除 ${dishes[index].name} 吗？`)) {
        dishes.splice(index, 1);
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
.menu-management {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.add-dish-form, .dish-list {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #45a049;
}

button:last-child {
  margin-right: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}

.dish-image {
  max-width: 80px;
  max-height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  max-width: 90%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>