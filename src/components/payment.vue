<template>
  <div class="payment-container">
    <h2>请完成支付</h2>
    <div class="payment-image">
      <img src="../../public/1.png" alt="支付二维码" />
    </div>
    <el-button 
      type="success" 
      @click="handlePaymentSuccess"
      class="payment-button"
    >
      支付成功
    </el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();

const handlePaymentSuccess = () => {
  ElMessage.success('您已支付成功！');
  setTimeout(() => {
    router.push('/user/menu'); // 跳转到菜单页面
  }, 1500); // 1.5秒后跳转
};
</script>

<style scoped>
.payment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
}

.payment-image {
  margin: 30px 0;
  max-width: 300px;
}

.payment-image img {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 4px;
}

.payment-button {
  margin-top: 20px;
  width: 200px;
  height: 50px;
  font-size: 16px;
}
</style>