<template>
  <div class="home-page">
    <img src="/first.jpg" alt="点餐系统首页背景" class="background-image" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
});
</script>

<style scoped>
.home-page {
  height: 75vh; /* 视口高度 */
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