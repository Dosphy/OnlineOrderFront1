<template>
  <div class="register-container">
    <div class="register-title">欢迎注册在线点单系统</div>
    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <label for="username">账号</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="phone">电话</label>
        <input type="text" id="phone" v-model="phone" required />
      </div>
      <div class="form-group">
        <label for="email">邮箱</label>
        <input type="text" id="email" v-model="email" required />
      </div>
      <button type="submit">注册</button>
      <div class="login-prompt">
        是否返回登录？ <router-link to="/">返回</router-link>
      </div>

    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage,ElLoading } from 'element-plus';
import { userRegister } from '../api/userApi.js'; // 注意这里导入的是具名导出

export default defineComponent({
  name: 'RegisterComponent',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const phone = ref('');
    const email = ref('');


    const handleSubmit = async () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      // 调用API并等待响应
      const response = await userRegister(username.value, password.value, phone.value, email.value);
      if (response.code === 200) {
        ElMessage({
          message: '注册成功！',
          type: 'success',
        });
        loading.close();
        // 跳转到登录页面
        router.push('/');
      } else{
        loading.close();
        ElMessage.error('用户名已存在');
      }
    };

    const goToLogin = () => {
      router.push('/');
    };

    return {
      username,
      password,
      phone,
      email,
      handleSubmit,
      goToLogin,
    };
  },
});
</script>

<style scoped>
/* 背景图样式 */
.register-container {
  height: 100vh;
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

.register-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.register-form {
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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}

button:hover {
  background-color: #1e7e34;
}

.login-prompt {
  margin-top: 10px;
  font-size: 0.9rem;
}

.login-button {
  background-color: #007bff;
}

.login-button:hover {
  background-color: #0056b3;
}

.login-link {
  color: #007bff;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>