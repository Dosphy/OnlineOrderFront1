<template>
  <div class="user-management-page">
    <!-- 主体内容区域 -->
    <div class="main-content">
      <h2>用户信息管理</h2>
      <!-- 关键：添加 align="center" 统一对齐，border 强制表格线 -->
      <el-table :data="users" style="width: 100%" border align="center" class="user-table">
        <!-- 用户名：固定宽度 + 内容居中 -->
        <el-table-column label="用户名" width="180" align="center">
          <template #default="scope">
            <el-tag>{{ scope.row.username }}</el-tag>
          </template>
        </el-table-column>

        <!-- 邮箱：自适应 + 垂直居中 -->
        <el-table-column prop="email" label="邮箱" width="220" align="center" />

        <!-- 手机号：固定宽度 + 内容居中 -->
        <el-table-column prop="phone" label="手机号" width="150" align="center" />

        <!-- 操作列：固定宽度 + 按钮组居中 -->
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button size="small" type="primary" @click="editUser(scope.row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" style="margin-left: 8px" @click="openDeleteDialog(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <!-- 编辑弹窗 -->
  <el-dialog v-model="editDialogVisible" title="编辑用户信息" width="30%">
    <el-form :model="editForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled /> <!-- 用户名通常不可修改 -->
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="editForm.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="editForm.email" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="editForm.phone" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submitEdit">保存</el-button>
    </template>
  </el-dialog>

<!-- 删除弹窗 -->
  <el-dialog v-model="deleteDialogVisible" title="删除用户" width="500" :before-close="handleClose">
    <span>确认删除用户{{ currentDeleteUser?.username }}吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { ElMessage,ElMessageBox } from 'element-plus';
import { getAllUserInfo, updateUserInfo, deleteUser } from '../api/adminApi.js'

export default defineComponent({
  setup() {
    const users = reactive([]); // 初始化用户数据为空数组
    const currentDeleteUser = ref<any>(null);

    const openDeleteDialog = (user: any) => {
      currentDeleteUser.value = user;
      deleteDialogVisible.value = true;
    };

    const confirmDelete = async () => {
      if (currentDeleteUser.value) {
        await deleteUserInfo(currentDeleteUser.value);  
        deleteDialogVisible.value = false;
      }
    };
    // 获取所有用户信息
    const fetchUsers = async () => {
      try {
        const data = await getAllUserInfo(); 
        users.splice(0, users.length, ...data);
      } catch (error) {
        ElMessage.error('获取用户信息失败');
        console.error('获取用户信息失败:', error);
      }
    };

    const editDialogVisible = ref(false)
    const deleteDialogVisible = ref(false);

    const editForm = ref({
      username: '',
      password: '',
      email: '',
      phone: '',
    });

    // 当前编辑的用户
    const currentUser = ref<any>(null);

    // 打开对话框并填充数据
    const openEditDialog = (user: any) => {
      currentUser.value = user;
      editForm.value = { ...user };
      editDialogVisible.value = true;
    };

    // 编辑用户
    const editUser = async (user: any) => {
      openEditDialog(user);
      console.log('编辑用户:', user);
    };

    // 提交编辑
    const submitEdit = async () => {
      try {
        const response = await updateUserInfo(
          editForm.value.username,
          editForm.value.password,
          editForm.value.email,
          editForm.value.phone
        );
        if (response.code === 300) {
          ElMessage.success('编辑成功');
          editDialogVisible.value = false;
          fetchUsers()
        } else {
          ElMessage.error('编辑失败');
        }
      } catch (error) {
        ElMessage.error('请求失败');
      }
    };

    // 删除用户
    const deleteUserInfo = async (user: any) => {
      const response = await deleteUser(user.username)
      console.log('删除用户:', user);
      if(response.code === 1100){
        ElMessage.success('删除成功!');
      } else {
        ElMessage.error('删除失败!');
      }
      fetchUsers();
    };

    const handleClose = (done: () => void) => {
      done()
    }
    // 在组件挂载时获取用户信息
    onMounted(fetchUsers);

    return {
      users,
      editUser,
      deleteUserInfo,
      editDialogVisible,
      deleteDialogVisible,
      editForm,
      submitEdit,
      handleClose,
      currentDeleteUser,
      openDeleteDialog,
      confirmDelete
    };
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
.el-table td,
.el-table th {
  vertical-align: middle !important;
}
</style>