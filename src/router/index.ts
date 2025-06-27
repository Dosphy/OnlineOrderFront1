import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../components/LoginForm.vue';
import RegisterView from '../components/RegisterForm.vue'; // 导入注册页面组件
import UserProfile from '../components/UserProfile.vue';
import UserInfoEdit from '../components/UserInfoEdit.vue';
import UserOrderList from '../components/UserOrderList.vue';
import StockManagement from '../components/StockManagement.vue'; 
import LoginForm from '../components/LoginForm.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: LoginForm,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView, // 添加注册页面路由
  },
{
    path: '/user',
    name: 'UserProfile',
    component: UserProfile,
    children: [
      {
        path: 'edit',
        name: 'UserInfoEdit',
        component: UserInfoEdit,
      },
      {
        path: 'orders',
        name: 'UserOrderList',
        component: UserOrderList,
      },
      { 
       path: '', 
      redirect: to => {
        return { name: 'UserInfoEdit' }; 
      }
    },
    ],
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;