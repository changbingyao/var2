<template>
  <div>
    <el-row type="flex"  justify="end">
      <el-form :label-position="labelPosition"
               :gutter="10"
               :model="formData">
        <el-col :span="5">
          <el-form-item label="用户名：" label-width="70px">
            <el-input v-model="formData.userName" clearable size="small" placeholder="请选择活动区域"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="用户编号：" label-width="90px">
            <el-input v-model="formData.userCode" clearable size="small" placeholder="请选择活动区域"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="角色：" label-width="60px">
            <el-select v-model="formData.shifou"
                       path="YN"
                       size="small"
                       placeholder="请选择活动区域">
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-form-item>
            <el-button type="primary" @click="handleSearch" size="mini">查询</el-button>
            <el-button type="danger" @click="handleReset" size="mini">重置</el-button>
            <el-button type="warning" @click="handleInstall" size="mini">新增</el-button>
            <el-button type="danger" @click="handleDelete" :disabled="selectedIds.length === 0" size="mini">删除</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "ListFunction",
    props: {
      selectedIds: {
        type: Array,
        requied: true
      }
    },
    data() {
      return {
        labelPosition: 'right',
        formData: {
          userName: '',
          userCode: '',
          offset: 1
        },
      }
    },
    methods: {
      handleSearch() {
        this.$emit('loadData', this.formData)
      },
      handleReset() {
        this.$emit('loadData', {offset: 1})
      },
      handleInstall() {
        this.$emit('handleInstall', false)
      },
      submitDelete() {
        this.$service.delete('/system/users', {data: this.selectedIds})
          .then(r => {
            if(r.data.code === '000000') {
              this.$emit('loadData')
              this.$message({
                showClose: true,
                message: '删除用户成功！',
                type: 'success'
              })
            }
          })
          .catch(err => {})
      },
      handleDelete() {
        this.$confirm('确定删除该用户吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          this.submitDelete()
        })
        .catch(action => {});
      }
    }
  }
</script>

<style scoped>

</style>
