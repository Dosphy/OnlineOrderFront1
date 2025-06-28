<template>
  <div class="user-profile">
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
import { defineComponent, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router'; // 确保导入

export default defineComponent({
  components: { RouterLink }, // 注册组件（如果用 template 写法）
  setup() {
    const menu = [
      { label: '首页', path: 'home' },
      { label: '菜单', path: 'menu' },
      { label: '购物车', path: 'shop' },
      { label: '个人信息编辑', path: 'edit' },
      { label: '历史订单查看', path: 'orders' }
    ];
    return { menu };
  }
});
</script>

<style scoped>
.user-profile {
  display: flex;
  min-height: calc(100vh - 60px);
}
.sidebar {
  width: 200px;
  background-color: #f8f9fa;
  border-right: 1px solid #eee;
}
.sidebar > div {
  padding: 15px;
  cursor: pointer;
}
.sidebar > div.active {
  background-color: #e9ecef;
  font-weight: bold;
}
.content {
  flex: 1;
  padding: 20px;
}
</style>