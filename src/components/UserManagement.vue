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
      ElMessage.success('编辑成功');
      console.log('编辑用户:', user);
    };

    const deleteUser = (user: any) => {
      ElMessage.success('删除成功');
      console.log('删除用户:', user);
    };

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