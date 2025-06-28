<template>
  <div class="login-container">
    <div class="login-title">欢迎登录在线点单管理系统</div>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="username">管理员账号</label>
        <input type="text" id="username" v-model="username"/>
      </div>
      <div class="form-group">
        <label for="password">管理员密码</label>
        <input type="password" id="password" v-model="password"/>
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'AdminLogin',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const handleSubmit = () => {
      
        ElMessage({
          message: '登录成功！',
          type: 'success',
        });
        
        // 跳转到管理员首页
        router.push('/admin');
      
    };
    /*const handleSubmit = async () => {
      try {
        // 调用API并等待响应
        const response = await adminLogin(username.value, password.value);
      
        ElMessage({
          message: '登录成功！',
          type: 'success',
        });
        
        // 跳转到管理员首页
        router.push('/admin/home');
      } catch (error) {
        console.error('登录失败:', error);
        if (error.response.data === '用户名或密码错误') {
          ElMessage.error('用户名或密码错误');
        } else {
          ElMessage.error('登录失败: ' + (error.response?.data?.message || error.message));
        }
      }
    };*/

    return {
      username,
      password,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
/* 背景图样式 */
.login-container {
  height: 90vh; /* 视口高度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('admin.jpg'); /* 引用背景图片 */
  background-size: cover; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 背景图片不重复 */
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
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>