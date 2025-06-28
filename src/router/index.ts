import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import RegisterForm from '@/components/RegisterForm.vue';
import UserProfile from '../components/UserProfile.vue';
import UserInfoEdit from '../components/UserInfoEdit.vue';
import UserOrderList from '../components/UserOrderList.vue';
import StockManagement from '../components/StockManagement.vue';
import Home from '../components/Home.vue';
import LoginForm from '@/components/LoginForm.vue';
import DishesList from '../components/DishesList.vue';
import AdminHome from '../components/AdminHome.vue';
import UserManagement from '../components/UserManagement.vue';
import OrderProcessing from '../components/OrderProcessing.vue';
import MenuManagement from '../components/MenuManagement.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import Adminlogin from '@/components/adminlogin.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LoginForm,
  },
  {
    path: '/register',
    component: RegisterForm,
  },
  {
    path:'/admin',
    name:'AdminLogin',
    component:Adminlogin,
  },
  {
    path: '/user',
    component: UserProfile,
    redirect: '/user/edit',
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'menu',
        component: DishesList,
      },
      {
        path: 'shop',
        component: ShoppingCart,
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
    ],
  },
  {
    path: '/admin',
    component: AdminHome,
     redirect: '/admin/user', 
    children: [
      {
        path: 'user',
        component: UserManagement
      },
      {
        path: 'order',
        component: OrderProcessing
      },
      {
        path: 'menu',
        component: MenuManagement
      },
      {
        path: 'stock',
        component: StockManagement
      },
    ]
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