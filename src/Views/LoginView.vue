<template>
  <div class="login-view">
    
    <div class="login-container">
      <LoginForm />
      <p>
        新用户没有账号？
        <router-link to="/register" class="register-link">注册</router-link>
      </p>
      <button @click="goToRegister" class="register-button">注册</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '../components/LoginForm.vue'

export default defineComponent({
  name: 'LoginView',
  components: {
    LoginForm,
  },
  setup() {
    const router = useRouter();

    const goToRegister = () => {
      router.push('/register');
    };

    return {
      goToRegister,
    };
  },
});
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 占满整个视口高度 */
  background-image: url('D:\domproject\online_1\beijing.jpg');
  background-size: cover; /* 背景图片覆盖整个容器 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 背景图片不重复 */
}

.login-container {
  background: rgba(255, 255, 255, 0.8); /* 半透明背景 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.register-link {
  color: #007bff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

.register-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.register-button:hover {
  background-color: #0056b3;
}
</style>