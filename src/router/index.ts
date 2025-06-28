import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import RegisterForm from '@/components/RegisterForm.vue';
import UserProfile from '../components/UserProfile.vue';
import UserInfoEdit from '../components/UserInfoEdit.vue';
import UserOrderList from '../components/UserOrderList.vue';
import StockManagement from '../components/StockManagement.vue'; 
import Home from '../components/Home.vue'; // 注意文件名大小写，原代码中是 Home.vue，不是 home.vue
import LoginForm from '@/components/LoginForm.vue';
import DishesList from '../components/DishesList.vue'; // 引入新增的菜品列表组件
import ShoppingCart from '@/components/ShoppingCart.vue';

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
    path: '/user',
    component: UserProfile,
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'menu', // 新增菜品列表路径
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