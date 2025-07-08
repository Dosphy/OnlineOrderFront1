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
          class="menu-item"
        >
          <!-- 可扩展图标，如Iconfont -->
          <span class="icon">{{ item.icon }}</span>
          <span class="label">{{ item.label }}</span>
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
import { RouterLink } from 'vue-router';

export default defineComponent({
  components: { RouterLink },
  setup() {
    const menu = [
      { label: '首页', path: 'home', icon: '🏠' },  // 简易图标，可替换为SVG/Icon组件
      { label: '菜单', path: 'menu', icon: '🍴' },
      { label: '购物车', path: 'shop', icon: '🛒' },
      { label: '个人信息编辑', path: 'edit', icon: '🖋️' },
      { label: '历史订单查看', path: 'orders', icon: '📜' }
    ];
    return { menu };
  }
});
</script>

<style scoped>
.user-profile {
  display: flex;
  min-height: calc(100vh - 60px);
  font-family: 'Microsoft YaHei', sans-serif;
}

.sidebar {
  width: 220px;
  background: linear-gradient(180deg, #8B4513, #A0522D); /* 棕色渐变背景 */
  border-right: 1px solid #6b3a1d; /* 棕色边框 */
  box-shadow: 2px 0 8px rgba(0,0,0,0.1); /* 侧栏阴影 */
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s ease;
}

.menu-item .icon {
  font-size: 18px;
  margin-right: 10px;
}

.menu-item .label {
  flex: 1;
  font-size: 16px;
}

/* 交互反馈强化 */
.menu-item:hover {
  background: rgba(255,255,255,0.1);
  transform: translateX(4px);
}

.menu-item.active {
  background: #f0e6d2; /* 棕色背景 */
  color: #8B4513; /* 棕色文字 */
  font-weight: 600;
  transform: translateX(0);
  box-shadow: inset 2px 0 0 #d2b48c; /* 左侧高亮线 */
}

.content {
  flex: 1;
  padding: 30px;
  background: #f8f9fa; /* 浅灰背景区分内容区 */
}
</style>