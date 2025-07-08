<template>
  <div class="home-page">
    <div class="content-area">
      <img src="/shouye.jpg" alt="点餐系统首页背景" class="background-image" />
    </div>
    
    <!-- 添加选择用餐人数的组件 -->
    <div class="order-form" v-if="showForm">
      <h2>请选择用餐人数</h2>
      <div class="people-options">
        <div 
          v-for="option in peopleOptions" 
          :key="option.value" 
          :class="['people-option', { 'selected': selectedPeople === option.value }]"
          @click="selectPeople(option.value)"
        >
          {{ option.label }}
        </div>
      </div>
      
      <!-- 当选择更多时显示输入框 -->
      <div class="custom-input" v-if="selectedPeople === -1">
        <input 
          type="number" 
          v-model.number="customPeople" 
          placeholder="请输入人数" 
          min="1"
        >
      </div>
      
      <button class="submit-btn" @click="submitOrder">提交</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'HomePage',
  
  setup() {
    // 用餐人数选项
    const peopleOptions = [
      { label: '1人', value: 1 },
      { label: '2人', value: 2 },
      { label: '4人', value: 4 },
      { label: '6人', value: 6 },
      { label: '更多', value: -1 }
    ];
    
    // 选中的人数
    const selectedPeople = ref(null);
    
    // 自定义人数
    const customPeople = ref(null);
    
    // 是否显示表单
    const showForm = ref(true);
    
    // 选择人数
    const selectPeople = (value) => {
      selectedPeople.value = value;
      // 如果不是选择更多，则重置自定义人数
      if (value !== -1) {
        customPeople.value = null;
      }
    };
    
    // 提交订单
    const submitOrder = () => {
      let peopleCount = selectedPeople.value;
      
      // 如果选择了更多，则使用自定义人数
      if (peopleCount === -1) {
        if (customPeople.value === null || customPeople.value < 1) {
          alert('请输入有效的用餐人数');
          return;
        }
        peopleCount = customPeople.value;
      }
      
      if (peopleCount === null) {
        alert('请选择用餐人数');
        return;
      }
      
      // 这里可以添加提交订单的逻辑
      console.log(`已选择${peopleCount}人用餐`);
      
      // 存储已提交状态到localStorage
      localStorage.setItem('diningPeople', peopleCount.toString());
      
      // 关闭表单
      showForm.value = false;
      
      // 显示成功信息（仅用于示例）
      alert(`已选择${peopleCount}人用餐，我们将为您准备相应的餐具！`);
    };
    
    // 页面加载时检查是否已经提交过
    onMounted(() => {
      const submittedCount = localStorage.getItem('diningPeople');
      if (submittedCount) {
        showForm.value = false;
      }
    });
    
    // 清除本地存储（仅用于演示，实际应用中可以根据需要调用）
    const clearStorage = () => {
      localStorage.removeItem('diningPeople');
      showForm.value = true;
    };
    
    return {
      peopleOptions,
      selectedPeople,
      customPeople,
      showForm,
      selectPeople,
      submitOrder,
      clearStorage
    };
  }
});
</script>

<style scoped>
.home-page {
  height: 75vh; /* 视口高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* 添加相对定位 */
  overflow: hidden; /* 防止内容超出 */
  background-color: #f5f5f5; /* 设置淡雅的背景色 */
}

.content-area {
  position: relative;
  width: 100%;
  height: 100%;
}

.background-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 覆盖整个容器 */
  right: 0; /* 将图片对齐到右边 */
  top: 0;
}

/* 添加样式来定位和样式化订单表单 */
.order-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8); /* 调整透明度 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  z-index: 10; /* 确保表单在图片上方 */
  text-align: center;
  width: 300px;
}

.people-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
}

.people-option {
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s;
}

.people-option.selected {
  background-color: #4a90e2;
  color: white;
}

.custom-input {
  margin: 15px 0;
  text-align: center;
}

.custom-input input {
  padding: 8px;
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.submit-btn:hover {
  background-color: #3a7bc8;
}
</style>