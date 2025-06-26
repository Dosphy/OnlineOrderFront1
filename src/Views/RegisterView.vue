<template>
  <div class="register-view">
    <RegisterForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegisterForm from '@/components/RegisterForm.vue';

export default defineComponent({
  name: 'RegisterView',
  components: {
    RegisterForm,
  },
});
</script>

<style scoped>
.register-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('beijing.jpg'); /* 设置背景图片 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.register-container {
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
</style>