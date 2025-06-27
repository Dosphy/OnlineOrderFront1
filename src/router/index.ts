import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import RegisterForm from '@/components/RegisterForm.vue';
import UserProfile from '../components/UserProfile.vue';
import UserInfoEdit from '../components/UserInfoEdit.vue';
import UserOrderList from '../components/UserOrderList.vue';
import StockManagement from '../components/StockManagement.vue'; 
import Home from '../components/home.vue';
import LoginForm from '@/components/LoginForm.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component:  LoginForm,
  },
  {
    path: '/register',
    component: RegisterForm,
  },
  {
    path: '/user',
    component: UserProfile,
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'edit',
        component: UserInfoEdit,
      },
      {
        path: 'orders',
        component: UserOrderList,
      },
      {
        path: 'stock',
        component: StockManagement,
      },
      { 
        path: '',
        redirect: '/user/edit' 
      },
    ],
  },
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;