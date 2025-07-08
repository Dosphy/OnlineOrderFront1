<template>
  <div class="admin-home">
    <div class="sidebar">
      <router-link 
        v-for="(item, index) in menu" 
        :key="index" 
        :to="item.path" 
        custom 
        v-slot="{ navigate, isActive }"
      >
        <div 
          :class="{ active: isActive }" 
          @click="navigate"
          class="menu-item"
        >
          <span class="menu-icon">{{ item.icon }}</span>
          <span class="menu-label">{{ item.label }}</span>
        </div>
      </router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const menu = [
      { label: '首页', path: '/admin/prime', icon: '🏠' },
      { label: '用户信息管理', path: '/admin/user', icon: '👤' },
      { label: '订单处理', path: '/admin/order', icon: '🛒' },
      { label: '菜单管理', path: '/admin/menu', icon: '📜' },
      { label: '库存管理', path: '/admin/stock', icon: '📦' },
    ];

    return {
      menu,
    };
  },
});
</script>

<style scoped>
.admin-home {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #8B0000; /* 深红色 */
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  color: #ffffff;
  transition: background 0.3s;
}

.menu-icon {
  font-size: 18px;
  margin-right: 12px;
  width: 20px; /* 统一图标宽度，保证对齐 */
  text-align: center;
}

.sidebar > div.active {
  background-color: #A52A2A; /* 稍浅的深红色 */
  color: #ffffff;
}

.content {
  flex: 1;
  padding: 24px;
  background: #fcfcfd;
}
</style>