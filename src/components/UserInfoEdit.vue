<template>
  <div class="user-info-container">
    <div class="user-info-card">
      <h2 class="section-title">个人信息编辑</h2>
      
      <el-table 
        :data="formRows" 
        border 
        style="width: 100%" 
        class="info-table"
      >
        <!-- 项目列：居中 -->
        <el-table-column 
          label="项目" 
          align="center"  
          width="120"
        >
          <template #default="scope">
            {{ scope.row.label }}：
          </template>
        </el-table-column>
        
        <!-- 内容列：居中 -->
        <el-table-column 
          label="内容" 
          align="center"  
        >
          <template #default="scope">
            <template v-if="scope.row.type === 'password'">
              <div class="password-wrap">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  v-model="userInfo[scope.row.prop]" 
                  placeholder="请输入密码" 
                  class="form-input" 
                />
                <span 
                  class="eye-icon" 
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </span>
              </div>
            </template>
            <template v-else>
              <input 
                :type="scope.row.type" 
                v-model="userInfo[scope.row.prop]" 
                placeholder="请输入{{ scope.row.label }}" 
                class="form-input" 
              />
            </template>
          </template>
        </el-table-column>
      </el-table>
      
      <button class="save-btn" @click="saveInfo">保存信息</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    // 用户信息
    const userInfo = reactive({
      username: '小小怪',
      password: '123456', 
      email: 'qwer123456@qq.com',
      phone: '13800138000'
    });
    
    // 密码显示状态
    const showPassword = ref(false); 
    
    // 表格行数据（配置化管理字段）
    const formRows = reactive([
      { label: '用户名', prop: 'username', type: 'text' },
      { label: '密码', prop: 'password', type: 'password' },
      { label: '邮箱', prop: 'email', type: 'email' },
      { label: '手机号', prop: 'phone', type: 'tel' },
    ]);
    
    // 保存逻辑
    const saveInfo = () => {
      alert('信息已保存（模拟操作）');
      console.log('保存的用户信息：', userInfo);
    };

    return {
      userInfo,
      showPassword,
      saveInfo,
      formRows
    };
  }
});
</script>

<style scoped>
/* 外层容器：和历史订单页统一宽度 */
.user-info-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 卡片样式：复用阴影、圆角 */
.user-info-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 标题：和历史订单页统一样式 */
.section-title {
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

/* 表格样式：复用历史订单页的表格风格 */
.info-table {
  margin-top: 15px;
}
.info-table::before {
  height: 0; /* 移除表格底部默认边框 */
}
.info-table th {
  background-color: #f5f7fa;
  color: #333;
  font-weight: bold;
}
.info-table .el-table__body tr:hover>td {
  background-color: #f5f7fa !important;
}

/* 输入框样式 */
.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* 密码框 + 小眼睛容器 */
.password-wrap {
  display: flex;
  align-items: center;
}
.eye-icon {
  cursor: pointer;
  font-size: 18px;
  margin-left: 8px;
}

/* 保存按钮：居中、限制宽度 */
.save-btn {
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
  display: block;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.save-btn:hover {
  background-color: #0056b3;
}
</style>