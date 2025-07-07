<template>
  <div class="login-container">
    <div class="login-title">欢迎登录在线点单系统</div>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="username">账号</label>
        <input type="text" id="username" v-model="username" required/>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required/>
      </div>
      <button type="submit">登录</button>
      <button type="button" @click="goToRegister" class="register-button">注册</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { userLogin } from '../api/userApi.js';

export default defineComponent({
  name: 'LoginComponent',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      // 调用API并等待响应
      const response = await userLogin(username.value, password.value,);
      console.log(response.data)
      if (response.data.code === 100) {
        ElMessage({
          message: '登录成功！',
          type: 'success',
        });
        // 跳转到首页
        router.push('/user/home');
      } else {
        ElMessage.error('用户名或密码错误');
      }
    };

    const goToRegister = () => {
      router.push('/register');
    };

    return {
      username,
      password,
      handleSubmit,
      goToRegister,
    };
  },
});
</script>

<style scoped>
/* 背景图样式 */
.login-container {
  height: 90vh;
  /* 视口高度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('beijing.jpg');
  /* 引用背景图片 */
  background-size: cover;
  /* 背景图片覆盖整个容器 */
  background-position: center;
  /* 背景图片居中 */
  background-repeat: no-repeat;
  /* 背景图片不重复 */
  padding: 20px;
}

.login-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.login-form {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
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
  margin-bottom: 10px;
}

button:hover {
  background-color: #0056b3;
}

.register-prompt {
  margin-top: 10px;
  font-size: 0.9rem;
}

.register-button {
  background-color: #28a745;
}

.register-button:hover {
  background-color: #1e7e34;
}

.register-link {
  color: #007bff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>