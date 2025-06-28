<template>
  <div class="prim-page">
    <img src="/public/admin.jpg" alt="点餐系统管理员首页背景" class="background-image" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'adminprimPage',
});
</script>

<style scoped>
.prim-page {
  height: 80vh; /* 视口高度 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 覆盖整个容器 */
}
</style>