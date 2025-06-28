<template>
  <div class="user-management">
    <h2>用户信息管理</h2>
    <el-table :data="users" style="width: 100%" border>
      <!-- 用户名列 -->
      <el-table-column label="用户名" width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>用户名: {{ scope.row.username }}</div>
            </template>
            <template #reference>
              <el-tag>{{ scope.row.username }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="220" />
      <el-table-column prop="phone" label="手机号" width="150" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="editUser(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteUser(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  setup() {
    const users = reactive([
      { username: '小小怪', email: 'qwer123456@qq.com', phone: '13800138000' },
      { username: '大大怪', email: 'dada@example.com', phone: '13900139000' },
      { username: '用户3', email: 'user3@example.com', phone: '13700137000' }
    ]);

    const editUser = (user: any) => {
      console.log('编辑用户:', user);
      ElMessage({
          message: '编辑成功！',
          type: 'success',
        });
      // 实现编辑逻辑
    };

    const deleteUser = (user: any) => {
      ElMessage({
          message: '删除成功！',
          type: 'success',
        });
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