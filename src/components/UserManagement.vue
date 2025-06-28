<template>
  <div class="user-management">
    <h2>用户信息管理</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>用户名</th>
          <th>邮箱</th>
          <th>手机号</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <button @click="editUser(user)">编辑</button>
            <button @click="deleteUser(user)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const users = reactive([
      { id: 1, username: '小小怪', email: 'qwer123456@qq.com', phone: '13800138000' },
      { id: 2, username: '大大怪', email: 'dada@example.com', phone: '13900139000' },
      { id: 3, username: '用户3', email: 'user3@example.com', phone: '13700137000' }
    ]);

    const editUser = (user: any) => {
      console.log('编辑用户:', user);
      // 实现编辑逻辑
    };

    const deleteUser = (user: any) => {
      console.log('删除用户:', user);
      // 实现删除逻辑
    };

    return {
      users,
      editUser,
      deleteUser
    };
  }
});
</script>

<style scoped>
.user-management {
  max-width: 1000px;
  margin: 0 auto;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
}
.user-table th,
.user-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>