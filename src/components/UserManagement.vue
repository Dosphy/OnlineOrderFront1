<template>
  <div class="user-management-page">
    <!-- 主体内容区域 -->
    <div class="main-content">
      <h2>用户信息管理</h2>
      <!-- 关键：添加 align="center" 统一对齐，border 强制表格线 -->
      <el-table 
        :data="users" 
        style="width: 100%" 
        border 
        align="center" 
        class="user-table"
      >
        <!-- 用户名：固定宽度 + 内容居中 -->
        <el-table-column 
          label="用户名" 
          width="180" 
          align="center"
        >
          <template #default="scope">
            <el-tag>{{ scope.row.username }}</el-tag>
          </template>
        </el-table-column>

        <!-- 邮箱：自适应 + 垂直居中 -->
        <el-table-column 
          prop="email" 
          label="邮箱" 
          width="220" 
          align="center"
        />

        <!-- 手机号：固定宽度 + 内容居中 -->
        <el-table-column 
          prop="phone" 
          label="手机号" 
          width="150" 
          align="center"
        />

        <!-- 操作列：固定宽度 + 按钮组居中 -->
        <el-table-column 
          label="操作" 
          width="180" 
          align="center"
        >
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
              style="margin-left: 8px"
              @click="deleteUser(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import {getAllUserInfo} from '../api/adminApi.js'

export default defineComponent({
  setup() {
    const users = reactive([]); // 初始化用户数据为空数组

    // 获取所有用户信息
    const fetchUsers = async () => {
      try {
        const data = await getAllUserInfo(); // 调用 adminapi.js 中的 getAllUserInfo 方法
        users.splice(0, users.length, ...data); // 更新用户数据
      } catch (error) {
        ElMessage.error('获取用户信息失败');
        console.error('获取用户信息失败:', error);
      }
    };

    // 编辑用户
    const editUser = (user: any) => {
      ElMessage.success('编辑成功');
      console.log('编辑用户:', user);
    };

    // 删除用户
    const deleteUser = (user: any) => {
      ElMessage.success('删除成功');
      console.log('删除用户:', user);
    };

    // 在组件挂载时获取用户信息
    onMounted(fetchUsers);

    return { users, editUser, deleteUser };
  }
});
</script>

<style scoped>
/* 页面布局 */
.user-management-page {
  display: flex;
  height: 100vh;
}

/* 侧边栏样式 */
.sidebar {
  width: 180px;
  background: #2f4050;
}
.sidebar-item {
  color: #fff;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
}
.sidebar-item.active {
  background: #1f2d3d;
  font-weight: bold;
}
.sidebar-item:hover {
  background: #1f2d3d;
}

/* 主体内容 */
.main-content {
  flex: 1;
  padding: 24px;
  background: #f3f3f4;
}

/* 表格样式重置 */
.user-table {
  --el-table-header-text-color: #666;
  --el-table-row-hover-bg-color: #f9f9f9;
}
/* 强制单元格内容垂直居中（覆盖 Element-UI 默认样式） */
.el-table td, .el-table th {
  vertical-align: middle !important;
}
</style>