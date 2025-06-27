<template>
  <div class="user-info-edit">
    <h2>个人信息编辑</h2>
    <form @submit.prevent="saveInfo">
      <!-- 用户名 -->
      <div class="form-group">
        <label>用户名：</label>
        <input v-model="userInfo.username" placeholder="请输入用户名" />
      </div>
      <!-- 密码 -->
      <div class="form-group password-group">
        <label>密码：</label>
        <div class="password-input-wrap">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            v-model="userInfo.password" 
            placeholder="请输入密码" 
          />
          <span 
            class="eye-icon" 
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? '👁️' : '👁️‍🗨️' }}
          </span>
        </div>
      </div>
      <!-- 邮箱 -->
      <div class="form-group">
        <label>邮箱：</label>
        <input v-model="userInfo.email" type="email" placeholder="请输入邮箱" />
      </div>
      <!-- 手机号 -->
      <div class="form-group">
        <label>手机号：</label>
        <input v-model="userInfo.phone" type="tel" placeholder="请输入手机号" />
      </div>
      <button type="submit">保存信息</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    
    const userInfo = reactive({
      username: '小小怪',
      password: '123456', 
      email: 'qwer123456@qq.com',
      phone: '13800138000'
    });
    const showPassword = ref(false); 

    const saveInfo = () => {
      alert('信息已保存（模拟操作）');
      console.log('保存的用户信息：', userInfo);
    };

    return {
      userInfo,
      showPassword,
      saveInfo
    };
  }
});
</script>

<style scoped>
.user-info-edit {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column; /* 让 label 和 input 垂直排列 */
}
label {
  margin-bottom: 5px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
/* 密码组的输入框 + 小眼睛 容器 */
.password-input-wrap {
  display: flex;
  align-items: center; /* 让小眼睛和输入框垂直居中对齐 */
}
.password-input-wrap input {
  flex: 1;
  margin-right: 8px;
}
/* 小眼睛图标样式 */
.eye-icon {
  cursor: pointer;
  font-size: 18px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>