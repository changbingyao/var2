<template>
  <el-form label-position="right" :inline="true" width="100%" :model="formData"  ref="queryForm">
    <el-row type="flex" justify="start" :gutter="20">
      <el-col :span="16">
        <el-form-item :label="$t('role.roleName')" prop="roleName">
          <el-input v-model="formData.roleName" clearable :placeholder="$t('placeholder.default',[$t('role.roleName')])"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8" style="text-align: right;padding-right: 0;">
        <el-form-item label-width="0px" style="margin-right: 0;">
          <el-button class="baseBlue" @click="handleSearch">{{$t('query')}}</el-button>
          <el-button class="baseBlue" @click="handleReset('queryForm')">{{$t('reset')}}</el-button>
          <el-button class="baseGreen" v-permission="'add','添加'" @click="handleAdd">{{$t('add')}}</el-button>
          <el-button class="baseRed" :disabled="selectedIds.length === 0" v-permission="'dels','删除(批量)'" @click="handleDelete">{{$t('delete')}}</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>

</template>

<script>
  export default {
    name: "RoleQuery",
    props: {
      selectedIds: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        formInline: {},
        formData: {
          operators:{roleName:'like'}
        },
      }
    },
    methods: {
      handleSearch() {
        this.$emit('loadData', this.formData)
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$emit('loadData', {offset: 1})
      },
      handleAdd() {
        this.$emit('add', true)
      },
      submitDelete() {
        this.$service.delete('/system/roles', {data: this.selectedIds})
          .then(r => {
            if (r.data.code === '000000') {
              this.$emit('loadData')
              this.$message({
                showClose: true,
                message: this.$t('text.success'),
                type: 'success'
              })
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: this.$t('text.failure') + err.data.msg,
              type: 'error'
            });
          })
      },
      handleDelete() {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.submitDelete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('cancelled')
          });
        });
      }
    }
  }
</script>

<style>
</style>
