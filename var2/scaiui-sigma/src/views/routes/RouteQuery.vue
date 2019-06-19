<template>
  <el-row type="flex" justify="left">
    <el-form label-position="right"
             :inline="true"
             :model="formData" ref="routeForm"
             style="width: 100%;">
      <sFormItem3 :label="$t('routes.routeName')" prop="regSystemDesc" style="width: 50%;">
        <el-input ref="accessDescRef" v-model="formData.routeName" clearable
                  :placeholder="$t('placeholder.default',[$t('routes.routeName')])"></el-input>
      </sFormItem3>
      <sFormItem3 label-width="0px" style="text-align: right;width: 50%;">
        <el-button class="baseBlue" @click="handleQuery">{{$t('query')}}</el-button>
        <el-button class="baseBlue" @click="handleReset('routeForm')">{{$t('reset')}}</el-button>
        <el-button class="baseGreen" v-permission="'add','添加'" @click="handleAdd">{{$t('add')}}</el-button>
        <el-button class="baseRed" :disabled="selectedIds.length === 0" v-permission="'dels','删除(批量)'" @click="handleDelete">{{$t('delete')}}</el-button>
      </sFormItem3>
    </el-form>
  </el-row>
</template>

<script>
  export default {
    name: "RouteQuery",
    props: {
      selectedIds: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        formData: {
          routeName: ''
        }
      }
    },
    methods: {
      // 查询功能
      handleQuery() {
        this.$emit('loadData', this.formData);
      },

      // 重置功能
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$refs.accessDescRef.customValue = "";
        this.formData = {};
        this.$emit('loadData', {offset: 0});
      },

      // 添加功能
      handleAdd() {
        this.$emit('add', true);
      },

      // 批量删除功能
      handleDelete() {
        this.$confirm(this.$t('confirm.delete'), this.$t('confirm.title'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('ok'),
          cancelButtonText: this.$t('cancel'),
          iconClass: 'el-icon-delete'
        }).then(() => {
          this.$service.delete('/interface/routeConfigs', {data: this.selectedIds})
            .then(r => {
              if (r.data.code === '000000') {
                this.$emit('loadData');
                this.$message({
                  showClose: true,
                  message: this.$t('text.success'),
                  type: 'success'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: r.data.msg,
                  type: 'error'
                });
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: err,
                type: 'error'
              });
            })
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
