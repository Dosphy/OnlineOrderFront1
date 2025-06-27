import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../Views/LoginView.vue';
import RegisterView from '../Views/RegisterView.vue';
import UserProfile from '../components/UserProfile.vue';
import UserInfoEdit from '../components/UserInfoEdit.vue';
import UserOrderList from '../components/UserOrderList.vue';
import StockManagement from '../components/StockManagement.vue'; 
import Home from '../components/home.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LoginView,
  },
  {
    path: '/register',
    component: RegisterView,
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