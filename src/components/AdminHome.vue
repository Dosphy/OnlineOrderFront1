<template>
  <div class="admin-home">
    <div class="sidebar">
      <router-link 
        v-for="(item, index) in menu" 
        :key="index" 
        :to="item.path" 
        custom 
        v-slot="{ href, navigate, isActive }"
      >
        <div 
          :class="{ active: isActive }" 
          @click="navigate"
        >
          {{ item.label }}
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
       { label: '首页', path: '/admin/prime' },
      { label: '用户信息管理', path: '/admin/user' },
      { label: '订单处理', path: '/admin/order' },
      { label: '菜单管理', path: '/admin/menu' },
      { label: '库存管理', path: '/admin/stock' },
      
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
  background-color: #046ef0cf;
  border-right: 1px solid #0675f5;
}
.sidebar > div {
  padding: 15px;
  cursor: pointer;
}
.sidebar > div.active {
  background-color: #edf1f4;
  font-weight: bold;
}
.content {
  flex: 1;
  padding: 24px;
  background: #fcfcfd;
}
</style>