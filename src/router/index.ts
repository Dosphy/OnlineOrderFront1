import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../Views/LoginView.vue';
import RegisterView from '../Views/RegisterView.vue'; // 导入注册页面组件

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView, // 添加注册页面路由
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;