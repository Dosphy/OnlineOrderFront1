<template>
  <div class="login-container">
    <div class="login-title">欢迎登录在线点单系统</div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">账号</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">登录</button>
    </form>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const username = ref('');
    const password = ref('');

    const handleSubmit = () => {
      console.log('Login:', { username: username.value, password: password.value });
      // 这里可以添加登录逻辑，例如发送请求到后端
    };

    return {
      username,
      password,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

.login-title {
  font-size: 2.5rem; /* 设置大字体 */
  font-weight: bold;
  color: rgb(35, 5, 232); /* 设置字体颜色为白色 */
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加文字阴影以增强对比 */
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>