import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../Views/LoginView.vue';
import RegisterView from '../Views/RegisterView.vue'; // 导入注册页面组件
import UserProfile from '../components/UserProfile.vue';
import UserInfoEdit from '../components/UserInfoEdit.vue';
import UserOrderList from '../components/UserOrderList.vue';

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